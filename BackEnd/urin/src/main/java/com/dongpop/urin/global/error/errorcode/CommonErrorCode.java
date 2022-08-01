package com.dongpop.urin.global.error.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {
    PARAMETER_IS_NOT_VALID(HttpStatus.BAD_REQUEST, "Parameter is not valid.");

    private final HttpStatus httpStatus;
    private final String message;
}
