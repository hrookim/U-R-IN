package com.dongpop.urin.global.error.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum HashtagErrorCode implements ErrorCode {
    NO_SUCH_HASHTAG(HttpStatus.NOT_FOUND, "Don't exist such hashtag."),
    DUPLICATED_HASHTAG(HttpStatus.BAD_REQUEST, "This is a duplicate hashtag."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
