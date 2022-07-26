package com.dongpop.urin.domain.inquiry.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class InquiryDto {
    private InquiryDetailDto parent;
    private List<InquiryDetailDto> children;
}
