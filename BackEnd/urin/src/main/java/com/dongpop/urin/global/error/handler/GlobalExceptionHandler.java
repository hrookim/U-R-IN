package com.dongpop.urin.global.error.handler;

import com.dongpop.urin.global.error.dto.ErrorResponse;
import com.dongpop.urin.global.error.errorcode.ValidationErrorCode;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> customException(CustomException e) {
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler({BindException.class, MethodArgumentNotValidException.class})
    public ResponseEntity<ErrorResponse> handleValidationException(BindException e){
        BindingResult bindingResult = e.getBindingResult();

        int lastIndex = bindingResult.getAllErrors().size() - 1;
        FieldError fieldError = (FieldError) bindingResult.getAllErrors().get(lastIndex);
        ValidationErrorCode validationErrorCode = ValidationErrorCode.builder()
                .message(fieldError.getDefaultMessage())
                .parameter(fieldError.getField())
                .build();
        log.info("[Binding Error] : Field = {}, Message = {}", fieldError.getDefaultMessage(), fieldError.getField());

        return ErrorResponse.toResponseEntity(validationErrorCode);
    }

}
