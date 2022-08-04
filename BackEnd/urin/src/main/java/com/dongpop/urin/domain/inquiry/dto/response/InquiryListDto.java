package com.dongpop.urin.domain.inquiry.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Data
public class InquiryListDto {
    private int totalPages;
    private List<InquiryDto> inquiryList;
}
