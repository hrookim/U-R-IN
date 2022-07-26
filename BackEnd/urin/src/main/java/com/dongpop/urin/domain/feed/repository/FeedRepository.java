package com.dongpop.urin.domain.feed.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeedRepository extends JpaRepository<Feed, Integer> {

    @Query(
            value = "SELECT f FROM Feed f" +
                    " JOIN FETCH f.study s" +
                    " JOIN FETCH f.member m" +
                    " JOIN FETCH f.parent p" +
                    " WHERE s.id = :studyId"
    )
    Page<Feed> findAllByStudyId(int studyId, Pageable pageable);
}
