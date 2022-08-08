package com.dongpop.urin.domain.inquiry.repository;

import com.dongpop.urin.domain.study.repository.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryRepository extends JpaRepository<Inquiry, Integer> {
    @EntityGraph(attributePaths = {"writer", "study", "parent"})
    Page<Inquiry> findAllByStudyAndParentIsNull(Study study, Pageable pageable);
}
