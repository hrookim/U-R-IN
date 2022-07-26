package com.dongpop.urin.domain.study.service;

import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.member.repository.MemberRepository;
import com.dongpop.urin.domain.participant.dto.ParticipantDto;
import com.dongpop.urin.domain.participant.repository.Participant;
import com.dongpop.urin.domain.participant.repository.ParticipantRepository;
import com.dongpop.urin.domain.study.dto.request.StudyDataDto;
import com.dongpop.urin.domain.study.dto.response.*;
import com.dongpop.urin.domain.study.repository.Study;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import com.dongpop.urin.domain.study.repository.StudyState;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

/**
 * 스터디 요약 리스트(페이징, 검색)
 * 스터디 상세 페이지
 * 스터디 생성
 * 스터디 정보 수정
 * 스터디 가입
 * 스터디 참가자 삭제
 * 7. 스터디 상태 변경
 *
 */

@RequiredArgsConstructor
@Service
public class StudyService {

    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;
    private final ParticipantRepository participantRepository;

    /**
     * 스터디 summary 리스트 (검색, 페이징)
     */
    @Transactional
    public StudyListDto getStudyList(Pageable pageable, String keyword) {
        Page<Study> pages = null;
        if (StringUtils.hasText(keyword))
            pages = studyRepository.findAllByTitleContaining(keyword, pageable);
        else
            pages = studyRepository.findAll(pageable);

        //TODO: Null체크 로직 추가
        List<StudySummaryDto> studyList = pages.toList().stream().map(s ->
                StudySummaryDto.builder()
                        .id(s.getId())
                        .memberCapacity(s.getMemberCapacity())
                        .title(s.getTitle())
                        .currentMember(s.getParticipants().size())
                        .build()
        ).collect(Collectors.toList());

        return new StudyListDto(pages.getTotalPages(), studyList);
    }

    /**
     * 스터디 상세 페이지
     */
    @Transactional
    public StudyDetailDto getStudyDetail(int studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new NoSuchElementException("해당 스터디가 존재하지 않습니다."));

        List<ParticipantDto> dtos = study.getParticipants().stream()
                .map(p -> ParticipantDto.builder()
                        .id(p.getId())
                        .nickname(p.getMember().getNickname())
                        .isLeader(p.isLeader())
                        .build()).collect(Collectors.toList());

        return StudyDetailDto.builder()
                .id(study.getId())
                .title(study.getTitle())
                .notice(study.getNotice())
                .memberCapacity(study.getMemberCapacity())
                .currentMember(study.getParticipants().size())
                .dDay((int) Duration.between(LocalDate.now(), study.getExpirationDate()).toDays())
                .isOnair(study.isOnair())
                .participants(dtos)
                .build();
    }

    /**
     * 스터디 생성
     */
    @Transactional
    public StudyIdDto generateStudy(StudyDataDto studyData, int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));

        Study study = studyRepository.save(Study.builder()
                .title(studyData.getTitle())
                .notice(studyData.getNotice())
                //TODO : 종료일이 매우 큰 숫자일 때 저장 값 정하기
                .expirationDate(studyData.getExpiredDate())
                .memberCapacity(studyData.getMemberCapacity())
                .build());

        participantRepository.save(Participant.builder()
                        .member(member)
                        .study(study)
                        .isLeader(true).build());

        return new StudyIdDto(study.getId());
    }

    /**
     * 스터디 정보 수정
     */
    @Transactional
    public StudyIdDto editStudy(int studyId, StudyDataDto studyData) {
        //TODO: 해당 회원이 수정 권한이 있는지 검증
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new NoSuchElementException("해당 스터디는 존재하지 않습니다."));
        study.updateStudyInfo(studyData.getTitle(), studyData.getNotice(),
                studyData.getMemberCapacity(), studyData.getExpiredDate());
        return new StudyIdDto(studyId);
    }

    /**
     * 스터디 가입
     */
    @Transactional
    public StudyJoinDto joinStudy(int memberId, int studyId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("없는 회원입니다."));
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new NoSuchElementException("해당 스터디가 존재하지 않습니다."));

        Integer participantId = participantRepository.save(Participant.builder()
                .study(study)
                .member(member)
                .isLeader(false)
                .build()).getId();
        return new StudyJoinDto(studyId, participantId);
    }

    /**
     * 스터디 참가자 삭제
     * - 내가 스스로 탈퇴
     * - 방장이 다른 사람을 강퇴
     */
    @Transactional
    public void removeStudyMember(int memberId, int studyId, int participantsId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("없는 회원입니다."));
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new NoSuchElementException("해당 스터디가 존재하지 않습니다."));
        Participant deleteParticipant = participantRepository.findById(participantsId)
                .orElseThrow(() -> new NoSuchElementException("해당 참가자는 없습니다."));

        if (isPossible(deleteParticipant, memberId, studyId)) {
            participantRepository.delete(deleteParticipant);
        }
        //TODO: else인 경우는 삭제가 불가능한 경우 -> Exception 던져주기
    }

    /**
     *
     * 스터디 상태 변경
     */
    @Transactional
    public StudyStatusDto changeStudyStatus(int studyId, StudyState status) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new NoSuchElementException("해당 스터디가 존재하지 않습니다."));

        //TODO: 상태변경 체크 로직 추가하기
        study.updateStatus(status);
        return new StudyStatusDto(studyId, status.name());
    }

    private boolean isPossible(Participant deleteParticipant, int memberId, int studyId) {
        //참가자는 방장 리스트가 아니어야함, 참가자와 내가 다르면 내가 방장이어야 함, 참가자와 내가 같으면 나는 방장이면 안됨
        if (deleteParticipant.isLeader())
            return false;

        Participant leadersParticipant = participantRepository.findLeader(studyId)
                .orElseThrow(() -> new NoSuchElementException("방장 찾기 실패"));
        int studyLeaderId = leadersParticipant.getMember().getId();

        return deleteParticipant.getMember().getId() != memberId ?
                studyLeaderId == memberId : studyLeaderId != memberId;
    }
}
