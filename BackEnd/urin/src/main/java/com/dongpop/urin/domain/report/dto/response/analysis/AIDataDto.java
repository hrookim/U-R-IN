package com.dongpop.urin.domain.report.dto.response.analysis;

import lombok.Getter;

import java.util.List;

@Getter
public class AIDataDto {
    private EmotionDataDto emotion;
    private List<PoseDataDto> poseDataList;
}
