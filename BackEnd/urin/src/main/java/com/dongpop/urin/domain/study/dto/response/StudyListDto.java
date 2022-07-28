package com.dongpop.urin.domain.study.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Data
public class StudyListDto {
    private int totalPages;
    private List<StudySummaryDto> studyList;
}
