package com.dongpop.urin.domain.study.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class StudyMyListDto {
    private List<StudySummaryDto> currentStudyList;
    private List<StudySummaryDto> terminatedStudyList;
}
