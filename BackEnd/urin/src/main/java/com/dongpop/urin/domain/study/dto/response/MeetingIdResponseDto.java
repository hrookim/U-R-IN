package com.dongpop.urin.domain.study.dto.response;

import com.dongpop.urin.domain.meeting.dto.response.MeetingIdDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class MeetingIdResponseDto {
    List<MeetingIdDto> meetingIdList;
}
