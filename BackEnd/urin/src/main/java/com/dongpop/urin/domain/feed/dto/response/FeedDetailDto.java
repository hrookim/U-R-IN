package com.dongpop.urin.domain.feed.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.persistence.GeneratedValue;
import java.util.List;

@Builder
@Data
public class FeedDetailDto {
    private int feedId;
    private String contents;
    private String createdAt;
    private boolean isDeleted;

    private int writerId;
    private String writer;
}
