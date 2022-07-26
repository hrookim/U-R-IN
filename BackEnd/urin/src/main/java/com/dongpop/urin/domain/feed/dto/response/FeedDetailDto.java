package com.dongpop.urin.domain.feed.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class FeedDetailDto {
    private int feedId;
    private String contents;
    private String createdAt;
    private boolean isDeleted;

    private int writerId;
    private String writer;
}
