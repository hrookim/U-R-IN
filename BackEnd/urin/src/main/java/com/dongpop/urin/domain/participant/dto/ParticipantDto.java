package com.dongpop.urin.domain.participant.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ParticipantDto {
    private int id;
    private int memberId;
    private String nickname;
    private Boolean isLeader;
}
