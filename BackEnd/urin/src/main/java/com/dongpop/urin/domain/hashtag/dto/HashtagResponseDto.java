package com.dongpop.urin.domain.hashtag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class HashtagResponseDto {
    private List<HashtagDataDto> hashtags;
}
