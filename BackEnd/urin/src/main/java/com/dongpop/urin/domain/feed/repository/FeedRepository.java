package com.dongpop.urin.domain.feed.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Integer> {

    @EntityGraph(attributePaths = {"member", "study", "parent"})
    Page<Feed> findAllByStudyIdAndParentIsNull(Integer studyId, Pageable pageable);
}
