package com.dongpop.urin.domain.study.repository;

import com.dongpop.urin.domain.study.entity.Study;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer>, StudyRepositoryCustom {
    @EntityGraph(attributePaths = {"participants"})
    Optional<Study> findById(Integer id);
}
