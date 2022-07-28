package com.dongpop.urin.domain.study.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class StudyListDto {
    private int totalElements;
    private List<StudySummaryDto> studyList;
}
