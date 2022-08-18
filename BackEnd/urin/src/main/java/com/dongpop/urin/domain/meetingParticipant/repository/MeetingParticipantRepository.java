package com.dongpop.urin.domain.meetingParticipant.repository;

import com.dongpop.urin.domain.meeting.entity.Meeting;
import com.dongpop.urin.domain.meetingParticipant.entity.MeetingParticipant;
import com.dongpop.urin.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingParticipantRepository extends JpaRepository<MeetingParticipant, Integer>, MeetingParticipantRepositoryCustom {
    Optional<MeetingParticipant> findByMeetingAndMember(Meeting meeting, Member member);
}
