package com.dongpop.urin.domain.study.dto.response;

import com.dongpop.urin.domain.hashtag.dto.HashtagDataDto;
import com.dongpop.urin.domain.study.entity.StudyStatus;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class StudySummaryDto {
    private int id;
    private String title;
    private int memberCapacity;
    private int currentMember;
    private StudyStatus status;
    private List<HashtagDataDto> hashtags;
}
