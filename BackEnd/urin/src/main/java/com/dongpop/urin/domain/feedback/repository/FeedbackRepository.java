package com.dongpop.urin.domain.feedback.repository;

import com.dongpop.urin.domain.feedback.entity.Feedback;
import com.dongpop.urin.domain.meeting.entity.Meeting;
import com.dongpop.urin.domain.member.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    Optional<Feedback> findByMeetingAndInterviewerAndInterviewee(Meeting meeting, Member interviewer, Member interviewee);
    @EntityGraph(attributePaths = {"feedbackContents"})
    List<Feedback> findByMeetingAndInterviewee(Meeting meeting, Member interviewee);
}
