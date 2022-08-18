package com.dongpop.urin.domain.analysis.entity;

public enum PostureType {

    UPRIGHT("정자세"), RAISE_HANDS("손들기"), LEAN("기울임"), LOOK_ASIDE("시선분산");

    private final String koreanName;

    PostureType(String koreanName) {
        this.koreanName = koreanName;
    }

    public PostureType getPostureType() {
        return PostureType.this;
    }
    public String getPostureKorean() {
        return this.koreanName;
    }
}
