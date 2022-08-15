package com.dongpop.urin.domain.meeting.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class MeetingCreateDto {
    @NotNull
    private Boolean isConnected;
    @NotBlank
    private String sessionId;
}
