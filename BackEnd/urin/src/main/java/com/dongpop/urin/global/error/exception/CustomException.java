package com.dongpop.urin.global.error.exception;

import com.dongpop.urin.global.error.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CustomException extends RuntimeException{
    private final ErrorCode errorCode;
}
