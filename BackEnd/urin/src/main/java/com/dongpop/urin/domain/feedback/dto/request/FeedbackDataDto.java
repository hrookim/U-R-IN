package com.dongpop.urin.domain.feedback.dto.request;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Builder
public class FeedbackDataDto {
    @NotBlank
    @NotNull
    @Size(min=1, max=50, message = "1자 이상 50자 이하로 입력해주세요.")
    private String question;
    @NotBlank
    @NotNull
    @Size(min=1, max=200, message = "1자 이상 200자 이하로 입력해주세요.")
    private String answer;
}
