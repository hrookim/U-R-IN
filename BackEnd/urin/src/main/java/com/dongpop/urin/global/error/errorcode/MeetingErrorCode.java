package com.dongpop.urin.global.error.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MeetingErrorCode implements ErrorCode {
    MEETING_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "Meeting is not exist."),
    SESSIONID_IS_NOT_EXIST(HttpStatus.BAD_REQUEST, "SessionId is not exist. Maybe meeting is not onair."),
    ONLY_POSSIBLE_STUDY_LEADER(HttpStatus.FORBIDDEN, "Only Study Leader can do it."),
    MEETING_IS_NOT_PART_OF_STUDY(HttpStatus.BAD_REQUEST, "The meeting is not part of a study.");
            ;

    private final HttpStatus httpStatus;
    private final String message;
}
