package com.dongpop.urin.global.error.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.message.Message;
import org.springframework.http.HttpStatus;

@Getter
public class ValidationErrorCode implements ErrorCode {
    private final String name = "VALIDATION_ERROR";
    private final HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
    private final String message;
    private String parameter;

    public ValidationErrorCode(String message) {
        this.message = message;
    }

    public ValidationErrorCode(String message, String parameter) {
        this.message = message;
        this.parameter = parameter;
    }

    @Override
    public String name() {
        return name;
    }
}
