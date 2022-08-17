package com.dongpop.urin.domain.analysis.dto.request;

import com.dongpop.urin.domain.analysis.entity.PostureType;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class PoseDataDto {

    @NotNull
    private PostureType className;
    private double probability;
}
