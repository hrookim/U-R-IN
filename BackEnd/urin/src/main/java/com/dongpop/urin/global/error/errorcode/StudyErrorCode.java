package com.dongpop.urin.global.error.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum StudyErrorCode implements ErrorCode {
    PARAMETER_IS_NOT_VALID(HttpStatus.BAD_REQUEST, "Parameter is not valid."),
    IMPOSSIBLE_SET_MEMBER_CAPACITY(HttpStatus.CONFLICT, "The requested capacity is less than the current participants."),
    POSSIBLE_ONLY_LEADER(HttpStatus.FORBIDDEN, "Possible only the study leader."),
    CAN_NOT_EDITING_TERMINATED_STUDY(HttpStatus.CONFLICT, "Can't edit terminated study."),
    STUDY_IS_FULL(HttpStatus.CONFLICT, "Study is full.")

    ;
    private final HttpStatus httpStatus;
    private final String message;
}
