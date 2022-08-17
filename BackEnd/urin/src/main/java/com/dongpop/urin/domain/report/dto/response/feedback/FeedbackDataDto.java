package com.dongpop.urin.domain.report.dto.response.feedback;

import lombok.Getter;

import java.util.List;

@Getter
public class FeedbackDataDto {
    List<QuestionContentDto> personality;
    List<QuestionContentDto> tech;
}
