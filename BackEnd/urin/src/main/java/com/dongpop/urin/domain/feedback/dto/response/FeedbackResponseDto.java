package com.dongpop.urin.domain.feedback.dto.response;

import com.dongpop.urin.domain.feedback.dto.request.FeedbackDataDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class FeedbackResponseDto {
    private List<FeedbackDataDto> techList;
    private List<FeedbackDataDto> personalityList;
}
