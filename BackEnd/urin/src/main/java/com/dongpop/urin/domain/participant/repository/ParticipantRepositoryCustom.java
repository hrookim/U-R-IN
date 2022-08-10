package com.dongpop.urin.domain.participant.repository;

import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.participant.entity.Participant;
import com.dongpop.urin.domain.study.dto.request.StudyMyDto;

import java.util.List;

public interface ParticipantRepositoryCustom {
    List<Participant> findMyCurrentStudyParticipants(Member member);
    List<Participant> findMyTerminatedStudyParticipants(Member member);
}
