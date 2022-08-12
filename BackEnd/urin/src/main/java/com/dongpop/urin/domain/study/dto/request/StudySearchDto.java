package com.dongpop.urin.domain.study.dto.request;

import com.dongpop.urin.domain.hashtag.dto.HashtagCodeDto;
import lombok.Data;

import java.util.List;

@Data
public class StudySearchDto {
    private String keyword;
    private Boolean isRecruiting;
    private String hashtags;
}
