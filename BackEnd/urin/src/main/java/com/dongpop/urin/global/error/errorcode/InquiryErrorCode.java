package com.dongpop.urin.global.error.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum InquiryErrorCode implements ErrorCode{
    DIFFRENT_STUDY(HttpStatus.BAD_REQUEST, "It's a different study."),
            ;

    private final HttpStatus httpStatus;
    private final String message;
}
