package com.dongpop.urin.domain.study.dto.request;

import lombok.Getter;

@Getter
public class StudyDataDto {
    private String title;
    private String contents;
    private String expiredDate;
    private int memberCapacity;
}
