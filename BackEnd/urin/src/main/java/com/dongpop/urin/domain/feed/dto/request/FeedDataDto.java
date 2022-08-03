package com.dongpop.urin.domain.feed.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@ToString
@AllArgsConstructor
@Getter
public class FeedDataDto {
    @NotNull
    @Positive
    private int parent;
    @NotBlank(message = "내용을 입력해주세요.")
    @Size(min=1)
    private String contents;
}
