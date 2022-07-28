package com.dongpop.urin.domain.study.dto.response;

import lombok.Getter;

@Getter
public class StudySummaryDto {
    private int id;
    private String title;
    private int memberCapacity;
    private int currentMember;
}
