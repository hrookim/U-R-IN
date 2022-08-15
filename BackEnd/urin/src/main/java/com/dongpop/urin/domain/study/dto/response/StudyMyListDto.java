package com.dongpop.urin.domain.study.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class StudyMyListDto {
    private int totalCurrentStudies;
    private int totalPastStudies;
    private List<StudySummaryDto> currentStudyList;
    private List<StudySummaryDto> pastStudyList;
}
