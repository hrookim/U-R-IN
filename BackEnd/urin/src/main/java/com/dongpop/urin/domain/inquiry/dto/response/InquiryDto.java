package com.dongpop.urin.domain.inquiry.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class InquiryDto {
    private InquiryDetailDto parent;
    private List<InquiryDetailDto> children;
}
