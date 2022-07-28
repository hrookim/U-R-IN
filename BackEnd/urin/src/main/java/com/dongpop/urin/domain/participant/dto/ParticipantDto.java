package com.dongpop.urin.domain.participant.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ParticipantDto {
    private int id;
    private String nickname;
    private boolean isLeader;
}
