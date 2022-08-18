package com.dongpop.urin.domain.report.dto.response.feedback;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnswerContentDto {
    private String interviewer;
    private String content;
}
