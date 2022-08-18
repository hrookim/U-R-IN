package com.dongpop.urin.domain.report.dto.response.analysis;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PoseDataDto {
    private String name;
    private double count;
}
