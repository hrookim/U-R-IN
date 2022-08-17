package com.dongpop.urin.global.error.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CommonErrorCode implements ErrorCode {
    DO_NOT_HAVE_AUTHENTICATION(HttpStatus.UNAUTHORIZED, "You don't have an authentication."),
    DO_NOT_HAVE_AUTHORIZATION(HttpStatus.FORBIDDEN, "You don't have an authorization."),
    NO_SUCH_ELEMENTS(HttpStatus.NOT_FOUND, "Don't exist such resource.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
