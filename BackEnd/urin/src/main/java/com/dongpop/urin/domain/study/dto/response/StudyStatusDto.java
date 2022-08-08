package com.dongpop.urin.domain.study.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@Getter
public class StudyStatusDto {
    private int studyId;
    private String status;
}
