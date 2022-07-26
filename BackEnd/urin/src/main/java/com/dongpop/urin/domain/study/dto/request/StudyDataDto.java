package com.dongpop.urin.domain.study.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class StudyDataDto {
    private String title;
    private String notice;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate expiredDate;
    private int memberCapacity;
}
