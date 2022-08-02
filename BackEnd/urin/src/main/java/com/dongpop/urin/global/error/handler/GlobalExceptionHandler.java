package com.dongpop.urin.global.error.handler;

import com.dongpop.urin.global.error.dto.ErrorResponse;
import com.dongpop.urin.global.error.exception.CustomException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> customException(CustomException e) {
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }
}
