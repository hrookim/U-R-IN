package com.dongpop.urin.domain.inquiry.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Getter
@JsonIgnoreProperties(ignoreUnknown=true)
public class InquiryDataDto {
    @Positive
    private int parent;
    @NotBlank(message = "내용을 입력해주세요.")
    @Size(min=1, message = "내용을 입력해주세요.")
    private String contents;
}
