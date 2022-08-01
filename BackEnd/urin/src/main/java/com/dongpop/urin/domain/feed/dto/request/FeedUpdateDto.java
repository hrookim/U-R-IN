package com.dongpop.urin.domain.feed.dto.request;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@ToString
@Getter
public class FeedUpdateDto {
    private String contents;
}
