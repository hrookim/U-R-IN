package com.dongpop.urin.domain.feed.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FeedRepository extends JpaRepository<Feed, Integer> {

    @Query(
            value = "SELECT f FROM Feed f" +
                    " JOIN FETCH f.study s" +
                    " JOIN FETCH f.member m" +
                    " LEFT JOIN FETCH f.parent p" +
                    " WHERE s.id = :studyId" +
                    " AND f.parent IS NULL",

            countQuery = "SELECT f FROM Feed f" +
//                        " JOIN FETCH f.study s" +
//                        " JOIN FETCH f.parent p" +
                        " WHERE f.study.id = :studyId" +
                        " AND f.parent IS NULL"
    )
    Page<Feed> findAllByStudyId(@Param("studyId") Integer studyId, Pageable pageable);
}
