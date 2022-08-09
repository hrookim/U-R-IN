package com.dongpop.urin.global.error.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MeetingErrorCode implements ErrorCode {
    MEETING_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "Meeting is not exist."),
    SESSIONID_IS_NOT_EXIST(HttpStatus.BAD_REQUEST, "SessionId is not exist. Maybe meeting is not onair."),
    MEETING_CREATE_ONLY_POSSIBLE_STUDY_LEADER(HttpStatus.FORBIDDEN, "Only Study Leader can create meeting."),
            ;

    private final HttpStatus httpStatus;
    private final String message;
}
