package com.dongpop.urin.domain.study.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudyRepositoryCustom {
    Page<Study> findStudyList(String keyword, boolean isRecruiting, Pageable pageable);
}
