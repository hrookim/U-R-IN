package com.dongpop.urin.domain.study.service;

import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.participant.dto.ParticipantDto;
import com.dongpop.urin.domain.participant.repository.Participant;
import com.dongpop.urin.domain.participant.repository.ParticipantRepository;
import com.dongpop.urin.domain.study.dto.request.StudyDataDto;
import com.dongpop.urin.domain.study.dto.response.*;
import com.dongpop.urin.domain.study.repository.Study;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import com.dongpop.urin.domain.study.repository.StudyStatus;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
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
    public StudyListDto getStudyList(Pageable pageable, String keyword, Boolean isRecruiting) {
        Page<Study> pages = studyRepository.findStudyList(keyword, isRecruiting, pageable);

        if (pages.isEmpty()) {
            return new StudyListDto(0, new ArrayList<StudySummaryDto>());
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
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));

        List<ParticipantDto> dtos = study.getParticipants().stream()
                .map(p -> ParticipantDto.builder()
                        .id(p.getId())
                        .memberId(p.getMember().getId())
                        .nickname(p.getMember().getNickname())
                        .isLeader(p.isLeader())
                        .build()).collect(Collectors.toList());

        int dDay = (int) Duration.between(LocalDate.now().atStartOfDay(),
                study.getExpirationDate().atStartOfDay()).toDays();
        dDay = dDay > 36500 ? -1 : dDay;

        return StudyDetailDto.builder()
                .id(study.getId())
                .title(study.getTitle())
                .notice(study.getNotice())
                .memberCapacity(study.getMemberCapacity())
                .currentMember(study.getParticipants().size())
                .status(study.getStatus())
                .expirationDate(study.getExpirationDate())
                .dDay(dDay)
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
        LocalDate expirationDate = studyData.getExpirationDate() != null ?
                studyData.getExpirationDate() : LocalDate.of(2222, 1, 1);
        Study study = studyRepository.save(Study.builder()
                .title(studyData.getTitle())
                .notice(studyData.getNotice())
                .expirationDate(expirationDate)
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
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));

        if (study.getStudyLeader().getId() != member.getId()) {
            log.info("Edit can only leader, leaderId = {}, memberId = {}",
                    study.getStudyLeader().getId(), member.getId());
            throw new CustomException(POSSIBLE_ONLY_LEADER);
        }
        if (study.getParticipants().size() > studyData.getMemberCapacity()) {
            throw new CustomException(IMPOSSIBLE_SET_MEMBER_CAPACITY);
        }
        if (study.getStatus().equals(StudyStatus.TERMINATED)) {
            throw new CustomException(CAN_NOT_EDITING_TERMINATED_STUDY);
        }

        study.updateStudyInfo(studyData.getTitle(), studyData.getNotice(),
                studyData.getMemberCapacity(), studyData.getExpirationDate());
        return new StudyIdDto(studyId);
    }

    /**
     * 스터디 가입
     */
    @Transactional
    public StudyJoinDto joinStudy(Member member, int studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));

        if (study.getParticipants().size() >= study.getMemberCapacity()) {
            throw new CustomException(STUDY_IS_FULL);
        }
        checkAlreadyRegistered(member, study);
        checkStudyStatus(study);

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
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));
        Participant deleteParticipant = participantRepository.findById(participantsId)
                .orElseThrow(() -> new CustomException(PARTICIPANT_IS_NOT_EXIST));

        if (isPossible(deleteParticipant, member, study)) {
            deleteStudyParticipant(study, deleteParticipant);
        }
    }

    /**
     * 스터디 상태 변경
     */
    @Transactional
    public StudyStatusDto changeStudyStatus(Member member, int studyId, StudyStatus status) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));

        if (status.name().equals(StudyStatus.TERMINATED.name()) &&
                study.getStudyLeader().getId() != member.getId()) {
            throw new CustomException(POSSIBLE_ONLY_LEADER);
        }
        //TODO: 상태변경 가능한 지 체크
        study.updateStatus(status);
        return new StudyStatusDto(studyId, status.name());
    }

    private void checkAlreadyRegistered(Member member, Study study) {
        study.getParticipants().forEach((participant) -> {
            if (participant.getMember().getId() == member.getId()) {
                throw new CustomException(ALREADY_REGISTERED_MEMBER);
            }
        });
    }

    private void checkStudyStatus(Study study) {
        if (study.getParticipants().size() + 1 == study.getMemberCapacity()) {
            study.updateStatus(StudyStatus.COMPLETED);
        }
    }

    private void deleteStudyParticipant(Study study, Participant deleteParticipant) {
        participantRepository.delete(deleteParticipant);
        if (study.getStatus().equals(StudyStatus.COMPLETED))
            study.updateStatus(StudyStatus.RECRUITING);
    }

    private boolean isPossible(Participant deleteParticipant, Member member, Study study) {
        //1. 삭제할 참가자는 방장이 아니어야 함.
        //2. 삭제할 참가자가 study에 속해있어야 함
        //3. 삭제할 참가자와 내가 다르면 내가 방장이어야 함,
        if (deleteParticipant.isLeader()) {
            throw new CustomException(CAN_NOT_DELETE_LEADER_PARTICIPANT);
        }
        if (deleteParticipant.getStudy().getId() != study.getId()) {
            throw new CustomException(PARTICIPANT_DOES_NOT_BELONG_STUDY);
        }

        Participant leadersParticipant = participantRepository.findLeader(study.getId())
                .orElseThrow(() -> new CustomException(FAIL_TO_FIND_LEADER));
        int studyLeaderId = leadersParticipant.getMember().getId();

        if (member.getId() != deleteParticipant.getMember().getId()
                && member.getId() != studyLeaderId) {
                throw new CustomException(POSSIBLE_ONLY_LEADER);
        }
        return true;
    }
}
