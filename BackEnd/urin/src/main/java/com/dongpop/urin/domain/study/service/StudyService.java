package com.dongpop.urin.domain.study.service;

import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.participant.dto.response.ParticipantDto;
import com.dongpop.urin.domain.participant.entity.Participant;
import com.dongpop.urin.domain.participant.repository.ParticipantRepository;
import com.dongpop.urin.domain.study.dto.request.StudyDataDto;
import com.dongpop.urin.domain.study.dto.response.*;
import com.dongpop.urin.domain.study.entity.Study;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import com.dongpop.urin.domain.study.entity.StudyStatus;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.dongpop.urin.domain.study.entity.StudyStatus.RECRUITING;
import static com.dongpop.urin.domain.study.entity.StudyStatus.TERMINATED;
import static com.dongpop.urin.global.error.errorcode.StudyErrorCode.*;


@Slf4j
@RequiredArgsConstructor
@Service
public class StudyService {

    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void checkTerminatedStudy() {
        log.info("[Check Terminated Study]");
        studyRepository.findAllByActive().forEach((study) -> {
            if (study.getExpirationDate().isBefore(LocalDate.now())) {
                log.info("Terminated Study : studyId = {}, ExpirationDate = {}, today = {}",
                        study.getId(), study.getExpirationDate(), LocalDate.now());
                study.updateStatus(TERMINATED);
            }
        });
    }

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
                .status(RECRUITING)
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
        if (study.getStatus().equals(TERMINATED)) {
            throw new CustomException(CAN_NOT_EDITING_TERMINATED_STUDY);
        }

        study.updateStudyInfo(studyData.getTitle(), studyData.getNotice(),
                studyData.getMemberCapacity(), studyData.getExpirationDate());
        return new StudyIdDto(studyId);
    }

    /**
     * 스터디 상태 변경
     */
    @Transactional
    public StudyStatusDto changeStudyStatus(Member member, int studyId, StudyStatus status) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));

        if (status.name().equals(TERMINATED.name()) &&
                study.getStudyLeader().getId() != member.getId()) {
            throw new CustomException(POSSIBLE_ONLY_LEADER);
        }
        //TODO: 상태변경 가능한 지 체크
        study.updateStatus(status);
        return new StudyStatusDto(studyId, status.name());
    }
}
