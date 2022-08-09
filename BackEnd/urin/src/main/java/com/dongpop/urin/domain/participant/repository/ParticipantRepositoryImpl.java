package com.dongpop.urin.domain.participant.repository;

import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.participant.entity.Participant;
import com.dongpop.urin.domain.participant.entity.QParticipant;
import com.dongpop.urin.domain.study.dto.request.StudyMyDto;
import com.dongpop.urin.domain.study.entity.StudyStatus;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

import static com.dongpop.urin.domain.participant.entity.QParticipant.*;
import static com.dongpop.urin.domain.study.entity.StudyStatus.*;

public class ParticipantRepositoryImpl implements ParticipantRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ParticipantRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Participant> findMyCurrentStudyParticipants(Member member) {
        return queryFactory.selectFrom(participant)
                .where(participant.study.status.notIn(TERMINATED))
                .orderBy(participant.study.id.asc())
                .fetch().stream().distinct().collect(Collectors.toList());
    }

    @Override
    public List<Participant> findMyTerminatedStudyParticipants(Member member) {
        return queryFactory.selectFrom(participant)
                .where(participant.study.status.eq(TERMINATED))
                .orderBy(participant.study.updatedAt.asc())
                .fetch().stream().distinct().collect(Collectors.toList());
    }
}
