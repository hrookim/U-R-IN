package com.dongpop.urin.domain.analysis.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table(name = "postures")
@Entity
public class Posture {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "data_id")
    private AnalysisData analysisData;

    @Enumerated(EnumType.STRING)
    private PostureType type;

    private int count;

    public void setAnalysisData(AnalysisData analysisData) {
        this.analysisData = analysisData;
    }

    public void setPostureData(PostureType type, int count) {
        this.type = type;
        this.count = count;
    }
}
