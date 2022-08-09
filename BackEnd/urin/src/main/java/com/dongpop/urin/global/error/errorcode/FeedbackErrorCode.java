package com.dongpop.urin.global.error.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum FeedbackErrorCode implements ErrorCode {
    FEEDBACK_IS_NOT_EXIST(HttpStatus.NOT_FOUND,"Feedback is not exist. Check meetingId or IntervieweeId."),
    CAN_NOT_BE_THE_SAME(HttpStatus.FORBIDDEN, "The interviewer and the interviewer cannot be the same."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
