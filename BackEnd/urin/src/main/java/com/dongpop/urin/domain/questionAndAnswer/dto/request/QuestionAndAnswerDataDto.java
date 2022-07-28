package com.dongpop.urin.domain.questionAndAnswer.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown=true)
public class QuestionAndAnswerDataDto {
    private int parent;
    private String contents;
}
