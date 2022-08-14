package com.dongpop.urin.domain.meeting.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MeetingSessionDto {
    private String sessionId;
    private Boolean isLeader;
}
