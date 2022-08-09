package com.dongpop.urin.domain.study.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class StudyMyDto {
    @NotNull
    private Boolean currentAll;
    @NotNull
    private Boolean terminatedAll;
}
