package com.dongpop.urin.domain.participant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ParticipantJoinDto {
    private int studyId;
    private int participantId;
}
