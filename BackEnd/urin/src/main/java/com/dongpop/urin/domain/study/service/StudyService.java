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
import com.dongpop.urin.domain.study.repository.StudyStatus;
import com.dongpop.urin.global.error.errorcode.ParticipantErrorCode;
import com.dongpop.urin.global.error.errorcode.StudyErrorCode;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

import static com.dongpop.urin.global.error.errorcode.ParticipantErrorCode.*;
import static com.dongpop.urin.global.error.errorcode.StudyErrorCode.*;


@Slf4j
@RequiredArgsConstructor
@Service
public class StudyService {

    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;

    /**
     * 스터디 summary 리스트 (검색, 페이징)
     */
    @Transactional
    public StudyListDto getStudyList(Pageable pageable, String keyword) {
        Page<Study> pages = null;
        if (StringUtils.hasText(keyword))
            pages = studyRepository.findSearchAllStudy(keyword, pageable);
        else
            pages = studyRepository.findAllStudy(pageable);

        if (pages.isEmpty()) {
            throw new CustomException(STUDY_IS_NOT_EXIST);
        }
        List<StudySummaryDto> studyList = pages.toList().stream().map(s ->
                StudySummaryDto.builder()
                        .id(s.getId())
                        .memberCapacity(s.getMemberCapacity())
                        .title(s.getTitle())
                        .currentMember(s.getParticipants().size())
                        .status(s.getStatus())
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
                .orElseThrow(() -> new CustomException(STUDY_IS_NOT_EXIST));

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
                .status(study.getStatus())
                .dDay((int) Duration.between(LocalDate.now().atStartOfDay(),
                                study.getExpirationDate().atStartOfDay()).toDays())
                .isOnair(study.isOnair())
                .participants(dtos)
                .build();
    }

    /**
     * 스터디 생성
     */
    @Transactional
    public StudyIdDto generateStudy(StudyDataDto studyData, Member member) {
        log.info("memberId : {}, studyData : {}", member.getId(), studyData);
        Study study = studyRepository.save(Study.builder()
                .title(studyData.getTitle())
                .notice(studyData.getNotice())
                //TODO : 종료일이 매우 큰 숫자일 때 저장 값 정하기
                .expirationDate(studyData.getExpiredDate())
                .memberCapacity(studyData.getMemberCapacity())
                .status(StudyStatus.RECRUITING)
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
    public StudyIdDto editStudy(Member member, int studyId, StudyDataDto studyData) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_IS_NOT_EXIST));

        if (study.getStudyLeader().getId() == member.getId()) {
            throw new CustomException(POSSIBLE_ONLY_LEADER);
        }
        if (study.getParticipants().size() > studyData.getMemberCapacity()) {
            throw new CustomException(IMPOSSIBLE_SET_MEMBER_CAPACITY);
        }
        if (study.getStatus().equals(StudyStatus.TERMINATED)) {
            throw new CustomException(CAN_NOT_EDITING_TERMINATED_STUDY);
        }

        study.updateStudyInfo(studyData.getTitle(), studyData.getNotice(),
                studyData.getMemberCapacity(), studyData.getExpiredDate());
        return new StudyIdDto(studyId);
    }

    /**
     * 스터디 가입
     */
    @Transactional
    public StudyJoinDto joinStudy(Member member, int studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_IS_NOT_EXIST));

        if (study.getParticipants().size() >= study.getMemberCapacity()) {
            throw new CustomException(STUDY_IS_FULL);
        }

        if (study.getParticipants().size() + 1 == study.getMemberCapacity()) {
            study.updateStatus(StudyStatus.COMPLETED);
        }

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
    public void removeStudyMember(Member member, int studyId, int participantsId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_IS_NOT_EXIST));
        Participant deleteParticipant = participantRepository.findById(participantsId)
                .orElseThrow(() -> new CustomException(PARTICIPANT_IS_NOT_EXIST));

        if (isPossible(deleteParticipant, member.getId(), studyId)) {
            deleteStudyParticipant(study, deleteParticipant);
            return;
        }
    }

    /**
     * 스터디 상태 변경
     */
    @Transactional
    public StudyStatusDto changeStudyStatus(Member member, int studyId, StudyStatus status) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_IS_NOT_EXIST));

        if (status.name().equals(StudyStatus.TERMINATED.name()) &&
                study.getStudyLeader().getId() != member.getId()) {
            throw new CustomException(POSSIBLE_ONLY_LEADER);
        }
        //TODO: 상태변경 가능한 지 체크
        study.updateStatus(status);
        return new StudyStatusDto(studyId, status.name());
    }

    private void deleteStudyParticipant(Study study, Participant deleteParticipant) {
        participantRepository.delete(deleteParticipant);
        if (study.getStatus().equals(StudyStatus.COMPLETED))
            study.updateStatus(StudyStatus.RECRUITING);
    }

    private boolean isPossible(Participant deleteParticipant, int memberId, int studyId) {
        //참가자는 방장 리스트가 아니어야함, 참가자와 내가 다르면 내가 방장이어야 함, 참가자와 내가 같으면 나는 방장이면 안됨
        if (deleteParticipant.isLeader()) {
            throw new CustomException(CAN_NOT_DELETE_LEADER_PARTICIPANT);
        }

        Participant leadersParticipant = participantRepository.findLeader(studyId)
                .orElseThrow(() -> new CustomException(FAIL_TO_FIND_LEADER));
        int studyLeaderId = leadersParticipant.getMember().getId();

        if (deleteParticipant.getMember().getId() != memberId) {
            if (studyLeaderId != memberId)
                throw new CustomException(POSSIBLE_ONLY_LEADER);
        } else {
            if (studyLeaderId == memberId)
                throw new CustomException(CAN_NOT_DELETE_LEADER_PARTICIPANT);
        }
        return true;
    }
}
