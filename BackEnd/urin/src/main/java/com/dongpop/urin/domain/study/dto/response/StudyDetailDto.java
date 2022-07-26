package com.dongpop.urin.domain.study.dto.response;

import com.dongpop.urin.domain.participant.dto.ParticipantDto;
import lombok.Getter;

import java.util.List;

@Getter
public class StudyDetailDto extends StudySummaryDto {
    private String contents;
    private List<ParticipantDto> participants;
}
