package com.dongpop.urin.domain.questionAndAnswer.dto.response;

import lombok.Getter;

@Getter
public class QuestionAndAnswerDetailDto {
    private int qnaId;
    private String contents;
    private String createdAt;
    private boolean isDeleted;

    private int writerId;
    private String writer;
}
