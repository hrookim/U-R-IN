package com.dongpop.urin.domain.feedback.service;

import com.dongpop.urin.domain.feedback.dto.request.FeedbackDataDto;
import com.dongpop.urin.domain.feedback.dto.request.FeedbackSetDataDto;
import com.dongpop.urin.domain.feedback.dto.response.FeedbackResponseDto;
import com.dongpop.urin.domain.feedback.entity.Feedback;
import com.dongpop.urin.domain.feedbackcontent.entity.FeedbackContentType;
import com.dongpop.urin.domain.feedback.repository.FeedbackRepository;
import com.dongpop.urin.domain.feedbackcontent.entity.FeedbackContent;
import com.dongpop.urin.domain.feedbackcontent.repository.FeedbackContentRepository;
import com.dongpop.urin.domain.meeting.entity.Meeting;
import com.dongpop.urin.domain.meeting.repository.MeetingRepository;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.member.repository.MemberRepository;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.dongpop.urin.domain.feedbackcontent.entity.FeedbackContentType.*;
import static com.dongpop.urin.global.error.errorcode.CommonErrorCode.*;
import static com.dongpop.urin.global.error.errorcode.FeedbackErrorCode.*;
import static com.dongpop.urin.global.error.errorcode.MeetingErrorCode.*;

@RequiredArgsConstructor
@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final FeedbackContentRepository feedbackContentRepository;
    private final MeetingRepository meetingRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public FeedbackResponseDto getFeedback(int meetingId, int intervieweeId, Member interviewer) {
        Meeting meeting = getMeeting(meetingId);
        Member interviewee = getMember(intervieweeId);

        if (interviewee.getId() == interviewer.getId()) {
            throw new CustomException(CAN_NOT_BE_THE_SAME);
        }

        Feedback feedback = feedbackRepository.findByMeetingAndInterviewerAndInterviewee(meeting, interviewer, interviewee)
                .orElseThrow(() -> new CustomException(FEEDBACK_IS_NOT_EXIST));
        return makeResponseDto(feedback);
    }

    @Transactional
    public void setFeedback(int meetingId, int intervieweeId, Member interviewer, FeedbackSetDataDto feedbackSetDataDto) {
        Meeting meeting = getMeeting(meetingId);
        Member interviewee = getMember(intervieweeId);

        if (interviewee.getId() == interviewer.getId()) {
            throw new CustomException(CAN_NOT_BE_THE_SAME);
        }

        Feedback feedback = feedbackRepository.findByMeetingAndInterviewerAndInterviewee(meeting, interviewer, interviewee)
                .orElseGet(() -> feedbackRepository.save(Feedback.builder()
                                .meeting(meeting)
                                .interviewee(interviewee)
                                .interviewer(interviewer).build()));

        FeedbackContentType type = feedbackSetDataDto.getType();
        List<FeedbackDataDto> feedbackDataList = feedbackSetDataDto.getFeedbackList();
        Collections.sort(feedbackDataList, ((o1, o2) -> o1.getNumber() - o2.getNumber()));

        createOrUpdateContents(feedback, type, feedbackDataList);
        deleteRemainContents(feedback, type, feedbackDataList);
    }

    private void createOrUpdateContents(Feedback feedback, FeedbackContentType type, List<FeedbackDataDto> feedbackDataList) {
        feedbackDataList.forEach((dataDto) -> {
            int number = dataDto.getNumber();
            FeedbackContent feedbackContent = feedbackContentRepository.findByFeedbackAndTypeAndNumber(feedback, type, number)
                    .orElseGet(() -> new FeedbackContent());
            feedbackContent.setFeedback(feedback);
            feedbackContent.updateContentData(number, dataDto.getQuestion(), dataDto.getAnswer(), type);
            feedbackContentRepository.save(feedbackContent);
        });
    }

    private void deleteRemainContents(Feedback feedback, FeedbackContentType type, List<FeedbackDataDto> feedbackDataList) {
        int maxNumber = feedbackDataList.get(feedbackDataList.size() - 1).getNumber();
        List<FeedbackContent> remainContents = feedbackContentRepository
                .findByFeedbackAndTypeAndNumberGreaterThan(feedback, type, maxNumber);
        feedbackContentRepository.deleteAllInBatch(remainContents);
    }

    private Member getMember(int intervieweeId) {
        Member interviewee = memberRepository.findById(intervieweeId)
                .orElseThrow(() -> new CustomException(NO_SUCH_ELEMENTS));
        return interviewee;
    }

    private Meeting getMeeting(int meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new CustomException(MEETING_IS_NOT_EXIST));
        return meeting;
    }

    private FeedbackResponseDto makeResponseDto(Feedback feedback) {
        List<FeedbackContent> feedbackContents = feedback.getFeedbackContents();
        Collections.sort(feedbackContents, ((o1, o2) -> o1.getNumber() - o2.getNumber()));

        List<FeedbackDataDto> techList = new ArrayList<>();
        List<FeedbackDataDto> personalityList = new ArrayList<>();

        for (FeedbackContent feedbackContent : feedbackContents) {
            FeedbackDataDto dataDto = FeedbackDataDto.builder()
                    .number(feedbackContent.getNumber())
                    .question(feedbackContent.getQuestion())
                    .answer(feedbackContent.getAnswer()).build();

            if (TECH.equals(feedbackContent.getType())) {
                techList.add(dataDto);
            } else {
                personalityList.add(dataDto);
            }
        }

        return new FeedbackResponseDto(techList, personalityList);
    }
}
