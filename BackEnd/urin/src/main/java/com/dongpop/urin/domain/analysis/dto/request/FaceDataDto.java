package com.dongpop.urin.domain.analysis.dto.request;

import lombok.Getter;

@Getter
public class FaceDataDto {
    private double happy;
    private double neutral;
    private double surprised;
    private double fearful;
    private double angry;
    private double sad;
    private double disgusted;
}
