package com.dongpop.urin.global.error.dto;

import com.dongpop.urin.global.error.errorcode.ErrorCode;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

@Getter
@Builder
public class ErrorResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final String name;
    private final String message;

    public static ResponseEntity<ErrorResponse> toResponseEntity(ErrorCode errorCode) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .name(errorCode.name())
                        .message(errorCode.getMessage())
                        .build());
    }
}
