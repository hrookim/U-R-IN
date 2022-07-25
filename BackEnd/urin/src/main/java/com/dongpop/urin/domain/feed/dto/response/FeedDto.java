package com.dongpop.urin.domain.feed.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class FeedDto {
    private FeedDetailDto parent;
    private List<FeedDetailDto> children;
}
