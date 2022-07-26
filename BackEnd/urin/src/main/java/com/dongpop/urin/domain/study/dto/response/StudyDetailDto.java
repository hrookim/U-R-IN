package com.dongpop.urin.domain.study.dto.response;

import com.dongpop.urin.domain.participant.dto.ParticipantDto;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
public class StudyDetailDto {
    private int id;
    private String title;
    private String notice;
    private int memberCapacity;
    private int currentMember;
    private int dDay;
    private boolean isOnair;
    private List<ParticipantDto> participants;
}
