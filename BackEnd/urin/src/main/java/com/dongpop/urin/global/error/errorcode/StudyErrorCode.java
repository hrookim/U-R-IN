package com.dongpop.urin.global.error.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum StudyErrorCode implements ErrorCode {
    STUDY_DOES_NOT_EXIST(HttpStatus.NOT_FOUND, "Study does not exist."),
    IMPOSSIBLE_SET_MEMBER_CAPACITY(HttpStatus.CONFLICT, "The requested capacity is less than the current participants."),
    POSSIBLE_ONLY_LEADER(HttpStatus.FORBIDDEN, "Possible only the study leader."),
    CAN_NOT_EDITING_TERMINATED_STUDY(HttpStatus.CONFLICT, "Can't edit terminated study."),
    STUDY_IS_FULL(HttpStatus.CONFLICT, "Study is full."),
    IMPOSSIBLE_SET_EXPIRATION_DATE_BEFORE_TODAY(HttpStatus.CONFLICT, "Expiration Date can't be set before today."),
    ALREADY_REGISTERED_MEMBER(HttpStatus.BAD_REQUEST, "You are already a registered member."),
    NOT_ENROLLED_MEMBER(HttpStatus.FORBIDDEN, "You are not a participant in the study."),
    ;
    private final HttpStatus httpStatus;
    private final String message;
}

