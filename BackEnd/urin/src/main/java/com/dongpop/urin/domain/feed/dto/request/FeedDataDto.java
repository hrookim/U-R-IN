package com.dongpop.urin.domain.feed.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@AllArgsConstructor
@Data
public class FeedDataDto {
    private int parent;
    private String contents;
}
