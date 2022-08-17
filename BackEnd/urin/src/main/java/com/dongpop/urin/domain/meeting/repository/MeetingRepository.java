package com.dongpop.urin.domain.meeting.repository;

import com.dongpop.urin.domain.meeting.entity.Meeting;
import com.dongpop.urin.domain.study.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
    Optional<Meeting> findFirstByStudyOrderByIdDesc(Study study);
}
