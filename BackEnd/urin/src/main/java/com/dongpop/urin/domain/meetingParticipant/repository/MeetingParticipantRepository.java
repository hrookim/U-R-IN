package com.dongpop.urin.domain.meetingParticipant.repository;

import com.dongpop.urin.domain.meetingParticipant.entity.MeetingParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingParticipantRepository extends JpaRepository<MeetingParticipant, Integer>, MeetingParticipantRepositoryCustom {
}
