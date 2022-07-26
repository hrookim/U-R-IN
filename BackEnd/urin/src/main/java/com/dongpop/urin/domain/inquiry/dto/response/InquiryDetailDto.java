package com.dongpop.urin.domain.inquiry.dto.response;

import lombok.Getter;

@Getter
public class InquiryDetailDto {
    private int qnaId;
    private String contents;
    private String createdAt;
    private boolean isDeleted;

    private int writerId;
    private String writer;
}
