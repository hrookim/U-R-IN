package com.dongpop.urin.domain.analysis.repository;

import com.dongpop.urin.domain.analysis.entity.AnalysisData;
import com.dongpop.urin.domain.meeting.entity.Meeting;
import com.dongpop.urin.domain.member.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AnalysisRepository extends JpaRepository<AnalysisData, Integer> {
    Optional<AnalysisData> findByMeetingAndInterviewee(Meeting meeting, Member interviewee);

    @EntityGraph(attributePaths = {"emotionList", "postureList"})
    List<AnalysisData> findByInterviewee(Member interviewee);

    @EntityGraph(attributePaths = {"emotionList", "postureList"})
    List<AnalysisData> findAllByIntervieweeIsPassed(Member interviewee);
}
