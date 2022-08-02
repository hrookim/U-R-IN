package com.dongpop.urin.global.error.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ParticipantErrorCode implements ErrorCode {
    PARTICIPANT_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "Study is not exist."),
    FAIL_TO_FIND_LEADER(HttpStatus.NOT_FOUND, "Fail to find study leader."),
    CAN_NOT_DELETE_LEADER_PARTICIPANT(HttpStatus.CONFLICT, "Can't delete leader participant.")
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
