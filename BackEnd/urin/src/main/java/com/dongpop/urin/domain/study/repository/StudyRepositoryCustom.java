package com.dongpop.urin.domain.study.repository;

import com.dongpop.urin.domain.study.dto.request.StudySearchDto;
import com.dongpop.urin.domain.study.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StudyRepositoryCustom {
    Page<Study> findStudyList(StudySearchDto studySearchDto, Pageable pageable);

    List<Study> findAllByActive();
}
