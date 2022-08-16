package com.dongpop.urin.domain.participant.repository;

import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.participant.entity.Participant;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.dongpop.urin.domain.participant.entity.QParticipant.participant;
import static com.dongpop.urin.domain.study.entity.StudyStatus.TERMINATED;

public class ParticipantRepositoryImpl implements ParticipantRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ParticipantRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Participant> findMyCurrentStudyParticipants(Member member) {
        return queryFactory.selectFrom(participant)
                .where(participant.member.eq(member), isPastStudy().not())
                .orderBy(participant.study.id.desc())
                .fetch();
    }

    @Override
    public List<Participant> findMyPastStudyParticipants(Member member) {
        return queryFactory.selectFrom(participant)
                .where(participant.member.eq(member), isPastStudy())
                .orderBy(participant.study.updatedAt.desc())
                .fetch();
    }

    private BooleanExpression isPastStudy() {
        return participant.study.status.eq(TERMINATED).or(participant.withdrawal.isTrue());
    }
}
