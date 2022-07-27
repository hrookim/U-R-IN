package com.dongpop.urin.domain.inquiry.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryRepository extends JpaRepository<Inquiry, Integer> {
    @EntityGraph(attributePaths = {"writer", "study", "parent"})
    Page<Inquiry> findAllByStudyIdAndParentIsNull(Integer studyId, Pageable pageable);
}
