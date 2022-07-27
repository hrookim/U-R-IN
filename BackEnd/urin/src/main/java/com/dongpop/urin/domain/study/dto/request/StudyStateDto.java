package com.dongpop.urin.domain.study.dto.request;

import com.dongpop.urin.domain.study.repository.StudyStatus;
import lombok.Data;

@Data
public class StudyStateDto {
    StudyStatus status;
}
