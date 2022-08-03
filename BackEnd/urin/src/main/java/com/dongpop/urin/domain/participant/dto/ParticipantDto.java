package com.dongpop.urin.domain.participant.dto;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Builder
@Data
public class ParticipantDto {
    @Positive
    private int id;
    @Positive
    private int memberId;
    @NotBlank
    private String nickname;
    @NotNull
    private Boolean isLeader;
}
