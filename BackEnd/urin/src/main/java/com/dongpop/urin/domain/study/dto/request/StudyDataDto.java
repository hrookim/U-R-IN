package com.dongpop.urin.domain.study.dto.request;

import com.dongpop.urin.domain.hashtag.dto.HashtagCodeDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

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
    @Min(2) @Max(4)
    private int memberCapacity;
    @NotBlank
    @Size(min = 1, max = 3, message = "해시태그는 1개 이상, 3개 이하로 선택하세요.")
    private String hashtags;
}
