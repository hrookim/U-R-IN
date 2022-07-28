package com.dongpop.urin.domain.questionAndAnswer.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class QuestionAndAnswerDto {
    private QuestionAndAnswerDetailDto parent;
    private List<QuestionAndAnswerDetailDto> children;
}
