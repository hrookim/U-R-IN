package com.dongpop.urin.domain.inquiry.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

@ToString
@Getter
@JsonIgnoreProperties(ignoreUnknown=true)
public class InquiryDataDto {
    @PositiveOrZero(message = "음수는 불가능합니다.")
    private int parent;
    @NotBlank(message = "내용을 입력해주세요.")
    @Size(min=1, message = "내용을 입력해주세요.")
    private String contents;
}
