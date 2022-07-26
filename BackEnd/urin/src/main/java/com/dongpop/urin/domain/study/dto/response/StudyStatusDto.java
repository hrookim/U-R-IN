package com.dongpop.urin.domain.study.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class StudyStatusDto {
    private int studyId;
    private String status;
}
