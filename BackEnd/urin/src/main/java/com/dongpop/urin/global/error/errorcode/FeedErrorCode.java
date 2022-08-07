package com.dongpop.urin.global.error.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum FeedErrorCode implements ErrorCode {
    DIFFRENT_STUDY(HttpStatus.BAD_REQUEST, "It's a different study."),
    PARENT_FEED_IS_NOT_EXIST(HttpStatus.BAD_REQUEST, "Parent feed is not exist."),
            ;

    private final HttpStatus httpStatus;
    private final String message;
}
