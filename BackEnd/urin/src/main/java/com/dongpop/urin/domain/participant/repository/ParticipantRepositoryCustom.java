package com.dongpop.urin.domain.participant.repository;

import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.participant.entity.Participant;

import java.util.List;

public interface ParticipantRepositoryCustom {
    List<Participant> findMyCurrentStudyParticipants(Member member);
    List<Participant> findMyPastStudyParticipants(Member member);
}
