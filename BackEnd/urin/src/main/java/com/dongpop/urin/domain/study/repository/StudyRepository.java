package com.dongpop.urin.domain.study.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer> {
    @Query("SELECT s FROM Study s" +
            " WHERE s.status NOT IN (com.dongpop.urin.domain.study.repository.StudyStatus.TERMINATED)")
    Page<Study> findAllStudy(Pageable pageable);

    @Query("SELECT s FROM Study s" +
            " WHERE s.status NOT IN (com.dongpop.urin.domain.study.repository.StudyStatus.TERMINATED)" +
            " AND s.title LIKE %:keyword%")
    Page<Study> findSearchAllStudy(@Param("keyword") String keyword, Pageable pageable);

    @EntityGraph(attributePaths = {"participants"})
    Optional<Study> findById(Integer id);
}
