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
    STUDY_IS_FULL(HttpStatus.CONFLICT, "Study is full.")

    ;
    private final HttpStatus httpStatus;
    private final String message;
}
// {
//    timeStamp : 2022~~
//    name: Vaildation Error
//    parameter : title
//    message: 제목은 2글자 이상 50글자 이하여야 합니다.
// }
// + HttpStatus : 404