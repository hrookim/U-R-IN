package com.dongpop.urin.domain.report.dto.response;

import com.dongpop.urin.domain.report.dto.response.analysis.ComparisonDataDto;
import com.dongpop.urin.domain.report.dto.response.feedback.FeedbackDataDto;
import lombok.Getter;

@Getter
public class ReportDataDto {
    private ComparisonDataDto aiData;
    private FeedbackDataDto feedback;
}
