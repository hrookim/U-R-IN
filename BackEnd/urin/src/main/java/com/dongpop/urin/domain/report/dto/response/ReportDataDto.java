package com.dongpop.urin.domain.report.dto.response;

import com.dongpop.urin.domain.report.dto.response.analysis.ComparisonDataDto;
import com.dongpop.urin.domain.report.dto.response.feedback.FeedbackDataDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReportDataDto {
    private ComparisonDataDto aiData;
    private FeedbackDataDto feedback;
}
