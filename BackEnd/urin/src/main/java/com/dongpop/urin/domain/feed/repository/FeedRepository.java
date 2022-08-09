package com.dongpop.urin.domain.feed.repository;

import com.dongpop.urin.domain.feed.entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedRepository extends JpaRepository<Feed, Integer> {

    @EntityGraph(attributePaths = {"writer", "study", "parent"})
    Page<Feed> findAllByStudyIdAndParentIsNull(Integer studyId, Pageable pageable);
}
