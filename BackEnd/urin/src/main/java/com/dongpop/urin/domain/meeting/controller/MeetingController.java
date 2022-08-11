package com.dongpop.urin.domain.meeting.controller;

import com.dongpop.urin.domain.meeting.dto.request.MeetingCreateDto;
import com.dongpop.urin.domain.meeting.dto.response.MeetingIdDto;
import com.dongpop.urin.domain.meeting.dto.response.MeetingSessionDto;
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
    public ResponseEntity<MeetingSessionDto> issueSessionId(@PathVariable int studyId,
                                                            @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        MeetingSessionDto meetingSessionDto = meetingService.issueSessionId(member, studyId);

        return ResponseEntity.ok().body(meetingSessionDto);
    }

    @PostMapping("{studyId}/meeting")
    public ResponseEntity<MeetingIdDto> createMeeting(@PathVariable int studyId,
                                           @RequestBody @Validated MeetingCreateDto meetingCreateDto,
                                            @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        MeetingIdDto meetingIdDto = meetingService.createMeeting(studyId, member, meetingCreateDto);

        return ResponseEntity.ok().body(meetingIdDto);
    }

    @PutMapping("{studyId}/meeting/{meetingId}")
    public ResponseEntity<?> endMeeting(@PathVariable int studyId, @PathVariable int meetingId,
                                                      @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        meetingService.endMeeting(studyId, meetingId, memberPrincipal.getMember());
        return ResponseEntity.ok().build();
    }
}
