package com.dongpop.urin.domain.analysis.repository;

import com.dongpop.urin.domain.analysis.entity.AnalysisData;
import com.dongpop.urin.domain.analysis.entity.Emotion;
import com.dongpop.urin.domain.analysis.entity.EmotionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmotionRepository extends JpaRepository<Emotion, Integer> {
    Optional<Emotion> findByAnalysisDataAndType(AnalysisData analysisData, EmotionType type);
}
