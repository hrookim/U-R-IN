package com.dongpop.urin.domain.analysis.repository;

import com.dongpop.urin.domain.analysis.entity.AnalysisData;
import com.dongpop.urin.domain.analysis.entity.Posture;
import com.dongpop.urin.domain.analysis.entity.PostureType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostureRepository extends JpaRepository<Posture, Integer> {
    Optional<Posture> findByAnalysisDataAndType(AnalysisData analysisData, PostureType type);
}
