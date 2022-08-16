package com.dongpop.urin.domain.meetingParticipant.repository;

import com.dongpop.urin.domain.meetingParticipant.entity.MeetingParticipant;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.study.entity.Study;

import java.util.List;

public interface MeetingParticipantRepositoryCustom {
    List<MeetingParticipant> findAllMeetingParticipantList(Study study, Member member);
}
