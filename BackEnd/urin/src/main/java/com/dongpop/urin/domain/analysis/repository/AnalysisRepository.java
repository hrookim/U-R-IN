package com.dongpop.urin.domain.analysis.repository;

import com.dongpop.urin.domain.analysis.entity.AnalysisData;
import com.dongpop.urin.domain.meeting.entity.Meeting;
import com.dongpop.urin.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnalysisRepository extends JpaRepository<AnalysisData, Integer> {
    Optional<AnalysisData> findByMeetingAndInterviewee(Meeting meeting, Member interviewee);
}
