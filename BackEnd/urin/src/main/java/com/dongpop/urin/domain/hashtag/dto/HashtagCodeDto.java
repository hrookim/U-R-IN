package com.dongpop.urin.domain.hashtag.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class HashtagCodeDto {
    @NotNull
    private String code;
}
