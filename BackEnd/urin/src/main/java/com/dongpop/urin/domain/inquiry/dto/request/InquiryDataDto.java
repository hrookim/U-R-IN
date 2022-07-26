package com.dongpop.urin.domain.inquiry.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown=true)
public class InquiryDataDto {
    private int parent;
    private String contents;
}
