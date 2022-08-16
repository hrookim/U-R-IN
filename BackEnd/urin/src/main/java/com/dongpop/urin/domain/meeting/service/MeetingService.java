package com.dongpop.urin.domain.meeting.service;

import com.dongpop.urin.domain.meeting.dto.request.MeetingCreateDto;
import com.dongpop.urin.domain.meeting.dto.response.MeetingIdDto;
import com.dongpop.urin.domain.meeting.dto.response.MeetingSessionDto;
import com.dongpop.urin.domain.meeting.entity.Meeting;
import com.dongpop.urin.domain.meeting.repository.MeetingRepository;
import com.dongpop.urin.domain.meetingParticipant.entity.MeetingParticipant;
import com.dongpop.urin.domain.meetingParticipant.repository.MeetingParticipantRepository;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.study.entity.Study;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.UUID;

import static com.dongpop.urin.global.error.errorcode.MeetingErrorCode.*;
import static com.dongpop.urin.global.error.errorcode.StudyErrorCode.STUDY_DOES_NOT_EXIST;

@Slf4j
@RequiredArgsConstructor
@Service
public class MeetingService {

    private final StudyRepository studyRepository;
    private final MeetingRepository meetingRepository;
    private final MeetingParticipantRepository meetingParticipantRepository;

    @Transactional
    public MeetingSessionDto issueSessionId(Member member, int studyId) {
        Study study = getStudy(studyId);

        if (isStudyLeader(member, study)) {
            String sessionId = UUID.randomUUID().toString();
            study.saveSessionId(sessionId);
            return new MeetingSessionDto(sessionId, true);
        }

        if (!StringUtils.hasText(study.getSessionId())) {
            throw new CustomException(SESSIONID_IS_NOT_EXIST);
        }
        return new MeetingSessionDto(study.getSessionId(), false);
    }

    @Transactional
    public MeetingIdDto createMeeting(int studyId, Member member, MeetingCreateDto meetingCreateDto) {
        if (!meetingCreateDto.getIsConnected()) {
            return new MeetingIdDto(0);
        }

        Study study = getStudy(studyId);
        if (!isStudyLeader(member, study)) {
            throw new CustomException(ONLY_POSSIBLE_STUDY_LEADER);
        }
        if (!meetingCreateDto.getSessionId().equals(study.getSessionId())) {
            throw new CustomException(SESSIONID_IS_NOT_VALID);
        }
        //TODO: 테스트를 쉽게 하기 위해 예외를 열어둠.
//        if (study.getIsOnair()) {
//            throw new CustomException(MEETING_IS_ALREADY_ONAIR);
//        }

        Meeting meeting = new Meeting(study);
        if (study.getStudyLeader().equals(member)) {
            study.changeOnairStatus(meetingCreateDto.getIsConnected());
            meeting = meetingRepository.save(meeting);
        } else {
            meeting = meetingRepository.findFirstByStudyOrderByIdDesc(study)
                    .orElseThrow(() -> new CustomException(MEETING_IS_NOT_EXIST));
        }
        meetingParticipantRepository.save(new MeetingParticipant(meeting, member));

        return new MeetingIdDto(meeting.getId());
    }

    @Transactional
    public void endMeeting(int studyId, int meetingId, Member member) {
        Study study = getStudy(studyId);
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new CustomException(MEETING_IS_NOT_EXIST));

        if (study.getId() != meeting.getStudy().getId()) {
            throw new CustomException(MEETING_IS_NOT_PART_OF_STUDY);
        }
        if (study.getStudyLeader().getId() != member.getId()) {
            throw new CustomException(ONLY_POSSIBLE_STUDY_LEADER);
        }

        study.closeMeeting();
        meeting.closeMeeting();
    }

    private Study getStudy(int studyId) {
        return studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));
    }

    private boolean isStudyLeader(Member member, Study study) {
        return study.getStudyLeader().getId() == member.getId();
    }


}
