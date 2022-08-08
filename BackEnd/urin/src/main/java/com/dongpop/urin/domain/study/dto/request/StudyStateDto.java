package com.dongpop.urin.domain.study.dto.request;

import com.dongpop.urin.domain.study.entity.StudyStatus;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class StudyStateDto {
    @NotNull
    StudyStatus status;
}
