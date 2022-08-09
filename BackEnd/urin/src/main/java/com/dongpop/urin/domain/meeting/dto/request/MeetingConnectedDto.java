package com.dongpop.urin.domain.meeting.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class MeetingConnectedDto {
    @NotNull
    private Boolean isConnected;
}
