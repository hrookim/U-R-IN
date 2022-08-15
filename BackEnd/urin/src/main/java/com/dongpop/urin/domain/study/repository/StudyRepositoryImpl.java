package com.dongpop.urin.domain.study.repository;

import com.dongpop.urin.domain.study.dto.request.StudySearchDto;
import com.dongpop.urin.domain.study.entity.Study;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.dongpop.urin.domain.study.entity.QStudy.study;
import static com.dongpop.urin.domain.study.entity.StudyStatus.RECRUITING;
import static com.dongpop.urin.domain.study.entity.StudyStatus.TERMINATED;

public class StudyRepositoryImpl implements StudyRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public StudyRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<Study> findStudyList(StudySearchDto studySearchDto, Pageable pageable) {
        JPAQuery<Study> query = queryFactory
                .selectFrom(study)
                .where(keywordLike(studySearchDto.getKeyword()),
                        statusIsRecruiting(studySearchDto.getIsRecruiting()),
                        includeSearchHashtagCode(studySearchDto.getHashtags()),
                        statusNotInTerminated())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        for (Sort.Order o : pageable.getSort()) {
            PathBuilder pathBuilder = new PathBuilder(study.getType(), study.getMetadata());
            query.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC : Order.DESC, pathBuilder.get(o.getProperty())));
        }

        List<Study> contents = query.fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(study.count())
                .from(study)
                .where(keywordLike(studySearchDto.getKeyword()),
                        statusIsRecruiting(studySearchDto.getIsRecruiting()),
                        includeSearchHashtagCode(studySearchDto.getHashtags()),
                        statusNotInTerminated());

        return PageableExecutionUtils.getPage(contents, pageable, countQuery::fetchOne);
    }

    private BooleanExpression includeSearchHashtagCode(String hashtags) {
        if (!StringUtils.hasText(hashtags)) {
            return null;
        }
        String[] hashtagCodes = hashtags.split("");
        BooleanExpression conditions = study.hashtagCodes.contains(hashtagCodes[0]);
        for (int i = 1; i < hashtagCodes.length; i++) {
            conditions = conditions.or(study.hashtagCodes.contains(hashtagCodes[i]));
        }
        return conditions;
    }

    @Override
    public List<Study> findAllByActive() {
        return queryFactory.selectFrom(study)
                .where(statusNotInTerminated())
                .fetch();
    }

    private BooleanExpression keywordLike(String keyword) {
        return StringUtils.hasText(keyword) ? study.title.contains(keyword) : null;
    }

    private BooleanExpression statusIsRecruiting(boolean isRecruiting) {
        return isRecruiting ? study.status.eq(RECRUITING) : null;
    }

    private BooleanExpression statusNotInTerminated() {
        return study.status.notIn(TERMINATED);
    }
}
