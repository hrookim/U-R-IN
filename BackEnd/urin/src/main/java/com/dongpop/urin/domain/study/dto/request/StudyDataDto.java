package com.dongpop.urin.domain.study.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@ToString
@AllArgsConstructor
@Getter
public class StudyDataDto {
    @NotBlank
    @NotNull
    @Size(min=3, max=50, message = "3자 이상 50자 이하로 입력해주세요.")
    private String title;
    @NotBlank
    @Size(min=1, message = "내용을 입력해주세요.")
    private String notice;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate expirationDate;
    @Max(6)
    private int memberCapacity;
}
