package com.dongpop.urin.global.error.handler;

import com.dongpop.urin.global.error.dto.ErrorResponse;
import com.dongpop.urin.global.error.errorcode.ValidationErrorCode;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> customException(CustomException e) {
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }

    //validation 에러 경우
    @ExceptionHandler({BindException.class, MethodArgumentNotValidException.class})
    public ResponseEntity<ErrorResponse> handleValidationException(BindingResult bindingResult){

        log.info("error={}",bindingResult);

        ValidationErrorCode validationErrorCode = new ValidationErrorCode("", "");
        bindingResult.getAllErrors().forEach(c -> {
            validationErrorCode.setMessage(c.getDefaultMessage());
            validationErrorCode.setParameter(((FieldError)c).getField());
                  });
        return ErrorResponse.toResponseEntity(validationErrorCode);
    }

}
