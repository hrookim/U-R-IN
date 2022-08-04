package com.dongpop.urin.domain.study.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class StudySummaryDto {
    private int id;
    private String title;
    private int memberCapacity;
    private int currentMember;
}
