package com.dongpop.urin.domain.meeting.repository;

import com.dongpop.urin.domain.meeting.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
}
