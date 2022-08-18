package com.dongpop.urin.domain.report.dto.response.feedback;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
public class QuestionContentDto {
    private String questionContent;
    private List<AnswerContentDto> answerContentList;
}
