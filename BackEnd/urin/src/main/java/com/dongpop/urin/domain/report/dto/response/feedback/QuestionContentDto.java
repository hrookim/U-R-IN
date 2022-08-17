package com.dongpop.urin.domain.report.dto.response.feedback;

import lombok.Getter;

import java.util.List;

@Getter
public class QuestionContentDto {
    private String questionContent;
    private List<AnswerContentDto> answerContentList;
}
