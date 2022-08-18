package com.dongpop.urin.domain.report.dto.response.analysis;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmotionDataDto {
    private int confidence;
    private int calm;
    private int nervous;
}
