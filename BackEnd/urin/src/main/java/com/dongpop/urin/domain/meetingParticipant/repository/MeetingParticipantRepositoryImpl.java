package com.dongpop.urin.domain.meetingParticipant.repository;

import com.dongpop.urin.domain.meeting.entity.Meeting;
import com.dongpop.urin.domain.meetingParticipant.entity.MeetingParticipant;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.study.entity.Study;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.dongpop.urin.domain.meeting.entity.QMeeting.meeting;
import static com.dongpop.urin.domain.meetingParticipant.entity.QMeetingParticipant.meetingParticipant;

public class MeetingParticipantRepositoryImpl implements MeetingParticipantRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MeetingParticipantRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<MeetingParticipant> findAllMeetingParticipantList(Study study, Member member) {
        return queryFactory
                .selectFrom(meetingParticipant)
                .where(meetingParticipant.member.eq(member), isIncludeStudy(study))
                .fetch();
    }

    private BooleanExpression isIncludeStudy(Study study) {
        JPQLQuery<Meeting> meetings = JPAExpressions
                .selectFrom(meeting)
                .where(meeting.study.eq(study));

        return meetingParticipant.meeting.in(meetings);
    }
}
