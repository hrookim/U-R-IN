package com.dongpop.urin.domain.report.dto.response.analysis;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AIDataDto {
    private EmotionDataDto emotion;
    private List<PoseDataDto> poseDataList;
}
