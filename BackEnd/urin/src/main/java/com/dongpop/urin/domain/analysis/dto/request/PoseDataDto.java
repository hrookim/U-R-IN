package com.dongpop.urin.domain.analysis.dto.request;

import lombok.Getter;

@Getter
public class PoseDataDto {

    // TODO : poseName 정의 후 ENUM으로 정의 + validation
    private String className;
    private double probability;
}
