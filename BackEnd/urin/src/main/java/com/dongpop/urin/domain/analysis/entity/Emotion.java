package com.dongpop.urin.domain.analysis.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table(name = "emotions")
@Entity
public class Emotion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "data_id")
    private AnalysisData analysisData;

    @Enumerated(EnumType.STRING)
    private EmotionType type;

    private int count;

    private int realAnalyzedTime;

    public void setAnalysisData(AnalysisData analysisData) {
        this.analysisData = analysisData;
    }

    public void setEmotionData(EmotionType type, int count, int realAnalyzedTime) {
        this.type = type;
        this.count = count;
        this.realAnalyzedTime = realAnalyzedTime;
    }
}
