package com.dongpop.urin.domain.study.service;

import com.dongpop.urin.domain.hashtag.dto.HashtagDataDto;
import com.dongpop.urin.domain.hashtag.entity.Hashtag;
import com.dongpop.urin.domain.hashtag.repository.HashtagRepository;
import com.dongpop.urin.domain.meeting.dto.response.MeetingIdDto;
import com.dongpop.urin.domain.meetingParticipant.entity.MeetingParticipant;
import com.dongpop.urin.domain.meetingParticipant.repository.MeetingParticipantRepository;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.notification.service.NotificationService;
import com.dongpop.urin.domain.participant.dto.response.ParticipantDto;
import com.dongpop.urin.domain.participant.entity.Participant;
import com.dongpop.urin.domain.participant.repository.ParticipantRepository;
import com.dongpop.urin.domain.study.dto.request.StudyDataDto;
import com.dongpop.urin.domain.study.dto.request.StudyMyDto;
import com.dongpop.urin.domain.study.dto.request.StudySearchDto;
import com.dongpop.urin.domain.study.dto.response.*;
import com.dongpop.urin.domain.study.entity.Study;
import com.dongpop.urin.domain.study.entity.StudyStatus;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static com.dongpop.urin.domain.study.entity.StudyStatus.RECRUITING;
import static com.dongpop.urin.domain.study.entity.StudyStatus.TERMINATED;
import static com.dongpop.urin.global.error.errorcode.HashtagErrorCode.DUPLICATED_HASHTAG;
import static com.dongpop.urin.global.error.errorcode.HashtagErrorCode.NO_SUCH_HASHTAG;
import static com.dongpop.urin.global.error.errorcode.StudyErrorCode.*;


@Slf4j
@RequiredArgsConstructor
@Service
public class StudyService {

    private static final int MY_STUDY_DEFAULT_SIZE = 4;

    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;
    private final HashtagRepository hashtagRepository;
    private final MeetingParticipantRepository meetingParticipantRepository;

    private final NotificationService notificationService;

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
    public StudyListDto getStudyList(Pageable pageable, StudySearchDto studySearchDto) {
        String hashtags = studySearchDto.getHashtags();
        if (StringUtils.hasText(hashtags)) {
            checkInputHashtags(hashtags);
        }

        Page<Study> pages = studyRepository.findStudyList(studySearchDto, pageable);
        if (pages.isEmpty()) {
            return new StudyListDto(0, new ArrayList<>());
        }

        List<StudySummaryDto> studyList = pages.toList().stream()
                .map(s -> {
                    List<String> hashtagNameList = new ArrayList<>();
                    String hashtagCodes = makeHashtagResponse(s, hashtagNameList);

                    return StudySummaryDto.builder()
                            .id(s.getId())
                            .memberCapacity(s.getMemberCapacity())
                            .title(s.getTitle())
                            .currentMember(s.getCurrentParticipantCount())
                            .status(s.getStatus())
                            .hashtagCodes(hashtagCodes)
                            .hashtagNameList(hashtagNameList)
                            .build();
                }).collect(Collectors.toList());

        return new StudyListDto(pages.getTotalPages(), studyList);
    }

    /**
     * 스터디 상세 페이지
     */
    @Transactional
    public StudyDetailDto getStudyDetail(int studyId) {
        Study study = getStudy(studyId);

        List<ParticipantDto> participants = study.getParticipants().stream()
                .filter((p) -> !p.getWithdrawal())
                .map(p -> ParticipantDto.builder()
                            .id(p.getId())
                            .memberId(p.getMember().getId())
                            .nickname(p.getMember().getNickname())
                            .isLeader(p.isLeader())
                            .build()).collect(Collectors.toList());

        int dDay = (int) Duration.between(LocalDate.now().atStartOfDay(),
                study.getExpirationDate().atStartOfDay()).toDays();
        dDay = dDay > 36500 ? -1 : dDay;

        List<String> hashtagNameList = new ArrayList<>();
        String hashtagCodes = makeHashtagResponse(study, hashtagNameList);

        return StudyDetailDto.builder()
                .id(study.getId())
                .title(study.getTitle())
                .notice(study.getNotice())
                .memberCapacity(study.getMemberCapacity())
                .currentMember(study.getCurrentParticipantCount())
                .status(study.getStatus())
                .expirationDate(study.getExpirationDate())
                .dDay(dDay)
                .isOnair(study.getIsOnair())
                .hashtagCodes(hashtagCodes)
                .hashtagNameList(hashtagNameList)
                .participants(participants)
                .build();
    }

    @Transactional
    public StudyMyListDto getMyStudy(StudyMyDto studyMyDto, Member member) {
        List<Participant> myCurrentStudyParticipants = participantRepository.findMyCurrentStudyParticipants(member);
        List<Participant> myPastStudyParticipants = participantRepository.findMyPastStudyParticipants(member);

        int totalCurrentStudies = myCurrentStudyParticipants.size();
        int totalPastStudies = myPastStudyParticipants.size();

        List<StudySummaryDto> currentStudyList = makeResponseList(myCurrentStudyParticipants, studyMyDto.getCurrentAll());
        List<StudySummaryDto> pastStudyList = makeResponseList(myPastStudyParticipants, studyMyDto.getPastAll());

        return StudyMyListDto.builder()
                .totalCurrentStudies(totalCurrentStudies)
                .totalPastStudies(totalPastStudies)
                .currentStudyList(currentStudyList)
                .pastStudyList(pastStudyList).build();
    }

    @Transactional
    public MeetingIdResponseDto getMeetingId(int studyId, Member member) {
        Study study = getStudy(studyId);

        if (!checkEnrolledMember(study, member)) {
            throw new CustomException(NOT_ENROLLED_MEMBER);
        }

        List<MeetingParticipant> meetingParticipantList = meetingParticipantRepository.findAllMeetingParticipantList(study, member);

        List<MeetingIdDto> idList = new ArrayList<>();
        meetingParticipantList.forEach(mt -> {
            idList.add(new MeetingIdDto(mt.getMeeting().getId()));
        });

        return new MeetingIdResponseDto(idList);
    }

    private boolean checkEnrolledMember(Study study, Member member) {
        for (Participant participant : study.getParticipants()) {
            if (participant.getMember().getId() == member.getId()) {
                return true;
            }
        }
        return false;
    }

    /**
     * 스터디 생성
     */
    @Transactional
    public StudyIdDto generateStudy(StudyDataDto studyData, Member member) {
        log.info("[Service GenerateStudy] : member_name = {}, studyData = {}", member.getMemberName(), studyData);
        LocalDate expirationDate = studyData.getExpirationDate() != null ?
                studyData.getExpirationDate() : LocalDate.of(2222, 1, 1);
        if (expirationDate.isBefore(LocalDate.now())) {
            throw new CustomException(IMPOSSIBLE_SET_EXPIRATION_DATE_BEFORE_TODAY);
        }

        Study study = studyRepository.save(Study.builder()
                .title(studyData.getTitle())
                .notice(studyData.getNotice())
                .expirationDate(expirationDate)
                .memberCapacity(studyData.getMemberCapacity())
                .status(RECRUITING)
                .build());
        participantRepository.save(Participant.makeParticipant(member, study, true));
        setHashtags(study, studyData.getHashtags());

        return new StudyIdDto(study.getId());
    }

    /**
     * 스터디 정보 수정
     */
    @Transactional
    public StudyIdDto editStudy(Member member, int studyId, StudyDataDto studyData) {
        Study study = getStudy(studyId);

        if (study.getStudyLeader().getId() != member.getId()) {
            log.info("Edit can only leader, leaderId = {}, memberId = {}",
                    study.getStudyLeader().getId(), member.getId());
            throw new CustomException(POSSIBLE_ONLY_LEADER);
        }
        if (study.getCurrentParticipantCount() > studyData.getMemberCapacity()) {
            throw new CustomException(IMPOSSIBLE_SET_MEMBER_CAPACITY);
        }
        if (study.getStatus().equals(TERMINATED)) {
            throw new CustomException(CAN_NOT_EDITING_TERMINATED_STUDY);
        }

        study.updateStudyInfo(studyData.getTitle(), studyData.getNotice(),
                studyData.getMemberCapacity(), studyData.getExpirationDate());
        setHashtags(study, studyData.getHashtags());

        return new StudyIdDto(studyId);
    }

    /**
     * 스터디 상태 변경
     */
    @Transactional
    public StudyStatusDto changeStudyStatus(Member member, int studyId, StudyStatus status) {
        Study study = getStudy(studyId);

        if (status.name().equals(TERMINATED.name()) &&
                study.getStudyLeader().getId() != member.getId()) {
            throw new CustomException(POSSIBLE_ONLY_LEADER);
        }
        study.updateStatus(status);
        return new StudyStatusDto(studyId, status.name());
    }

    private Study getStudy(int studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));
        return study;
    }

    private List<HashtagDataDto> getHashtagDatas(Study study) {
        String[] hashtagCodes = study.getHashtagCodes().split("");
        List<String> hashtagCodeList = new ArrayList<>(Arrays.asList(hashtagCodes));

        return hashtagRepository.findAllByCodeIn(hashtagCodeList).stream()
                .map(h -> new HashtagDataDto(h.getCode(), h.getName()))
                .collect(Collectors.toList());
    }

    private String makeHashtagResponse(Study study, List<String> hashtagNameList) {
        List<HashtagDataDto> hashtagDatas = getHashtagDatas(study);

        StringBuilder sb = new StringBuilder();
        hashtagDatas.forEach((dataDto) -> {
            sb.append(dataDto.getCode());
            hashtagNameList.add(dataDto.getName());
        });
        return sb.toString();
    }

    private List<StudySummaryDto> makeResponseList(List<Participant> myStudyParticipants, boolean allFlag) {
        List<StudySummaryDto> studyResponseList = new ArrayList<>();

        for (Participant participant : myStudyParticipants) {
            Study study = participant.getStudy();

            List<String> hashtagNameList = new ArrayList<>();
            String hashtagCodes = makeHashtagResponse(study, hashtagNameList);

            StudySummaryDto studySummaryDto = StudySummaryDto.builder()
                    .id(study.getId())
                    .title(study.getTitle())
                    .memberCapacity(study.getMemberCapacity())
                    .currentMember(study.getCurrentParticipantCount())
                    .status(study.getStatus())
                    .hashtagCodes(hashtagCodes)
                    .hashtagNameList(hashtagNameList).build();
            studyResponseList.add(studySummaryDto);
            if (!allFlag && studyResponseList.size() >= MY_STUDY_DEFAULT_SIZE) {
                break;
            }
        }
        return studyResponseList;
    }

    private void setHashtags(Study study, String hashtags) {
        checkInputHashtags(hashtags);
        study.saveHashtagCodes(hashtags);
    }

    private void checkInputHashtags(String hashtags) {
        String[] hashtagCodes = hashtags.split("");
        checkDuplicatedHashtag(hashtagCodes);
        checkExistHashtag(hashtagCodes);
    }

    private void checkExistHashtag(String[] hashtagCodes) {
        List<String> hashtagCodeList = new ArrayList<>(Arrays.asList(hashtagCodes));
        List<Hashtag> findHashtagList = hashtagRepository.findAllByCodeIn(hashtagCodeList);
        if (hashtagCodes.length != findHashtagList.size()) {
            throw new CustomException(NO_SUCH_HASHTAG);
        }
    }

    private void checkDuplicatedHashtag(String[] hashtagCodes) {
        Set<String> checkDuplicateSet = new HashSet<>();
        for (String hashtagCode : hashtagCodes) {
            if (!checkDuplicateSet.add(hashtagCode)) {
                throw new CustomException(DUPLICATED_HASHTAG);
            }
        }
    }


}
