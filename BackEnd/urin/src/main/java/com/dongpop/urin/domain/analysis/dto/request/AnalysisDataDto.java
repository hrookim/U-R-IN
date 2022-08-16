package com.dongpop.urin.domain.analysis.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class AnalysisDataDto {
    private List<FaceDataDto> faceDataList;
    private List<PoseDataDto> poseDataList;
}
