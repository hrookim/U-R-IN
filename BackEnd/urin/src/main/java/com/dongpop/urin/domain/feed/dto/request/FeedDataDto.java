package com.dongpop.urin.domain.feed.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown=true)
public class FeedDataDto {
    private int parent;
    private String contents;
}
