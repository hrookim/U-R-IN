package com.dongpop.urin.domain.meeting.controller;

import com.dongpop.urin.domain.meeting.dto.request.MeetingConnectedDto;
import com.dongpop.urin.domain.meeting.dto.response.MeetingIdDto;
import com.dongpop.urin.domain.meeting.dto.response.MeetingSessionIdDto;
import com.dongpop.urin.domain.meeting.service.MeetingService;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/studies")
public class MeetingController {
    private final MeetingService meetingService;

    @GetMapping("/{studyId}/meeting")
    public ResponseEntity<MeetingSessionIdDto> issueSessionId(@PathVariable int studyId,
                                          @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        String sessionId = meetingService.issueSessionId(member, studyId);

        return ResponseEntity.ok().body(new MeetingSessionIdDto(sessionId));
    }

    @PostMapping("{studyId}/meeting")
    public ResponseEntity<MeetingIdDto> createMeeting(@PathVariable int studyId,
                                           @RequestBody @Validated MeetingConnectedDto meetingConnectedDto,
                                            @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        MeetingIdDto meetingIdDto = meetingService.createMeeting(studyId, member, meetingConnectedDto.getIsConnected());

        return ResponseEntity.ok().body(meetingIdDto);
    }
}
