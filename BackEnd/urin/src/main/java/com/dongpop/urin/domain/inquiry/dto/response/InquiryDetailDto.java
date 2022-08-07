package com.dongpop.urin.domain.inquiry.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder
@Data
public class InquiryDetailDto {
    private int inquiryId;
    private String contents;
    private String createdAt;
    private Boolean isDeleted;

    private int writerId;
    private String writer;
}
