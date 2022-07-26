package com.dongpop.urin.domain.study.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer> {

    Page<Study> findAll(Pageable pageable);

    Page<Study> findAllByTitleContaining(String keyword, Pageable pageable);

    @EntityGraph(attributePaths = {"participants"})
    Optional<Study> findById(Integer id);
}
