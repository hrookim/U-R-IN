package com.dongpop.urin.domain.report.dto.response.analysis;

import lombok.Getter;

@Getter
public class EmotionDataDto {
    private int confidence;
    private int calm;
    private int nervous;
}
