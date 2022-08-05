package com.dongpop.urin.global.error.errorcode;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@Builder
public class ValidationErrorCode implements ErrorCode {
    private final String name = "VALIDATION_ERROR";
    private final HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
    private final String message;
    private String parameter;

    @Override
    public String name() {
        return name;
    }
}
