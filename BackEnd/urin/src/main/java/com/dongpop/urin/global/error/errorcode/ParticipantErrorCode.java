package com.dongpop.urin.global.error.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ParticipantErrorCode implements ErrorCode {
    PARTICIPANT_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "Participant is not exist."),
    FAIL_TO_FIND_LEADER(HttpStatus.NOT_FOUND, "Fail to find study leader."),
    CAN_NOT_DELETE_LEADER_PARTICIPANT(HttpStatus.CONFLICT, "Can't delete leader participant."),
    PARTICIPANT_DOES_NOT_BELONG_STUDY(HttpStatus.BAD_REQUEST, "Participants does not belong to the study."),
    ALREADY_WITHDRAW_PARTICIPANT(HttpStatus.BAD_REQUEST, "Already a withdrawn participant."),
    CAN_NOT_WITHDRAW_PARTICIPANT_IN_TERMINATED_STUDY(HttpStatus.CONFLICT, "Participants in a finished study cannot be expelled."),
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
