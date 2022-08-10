package com.dongpop.urin.domain.feedback.controller;

import com.dongpop.urin.domain.feedback.dto.request.FeedbackSetDataDto;
import com.dongpop.urin.domain.feedback.dto.response.FeedbackResponseDto;
import com.dongpop.urin.domain.feedback.service.FeedbackService;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/meeting")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @GetMapping("{meetingId}/feedback/{intervieweeId}")
    public ResponseEntity<?> getFeedback(@PathVariable int meetingId, @PathVariable int intervieweeId,
                                         @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        FeedbackResponseDto responseDto =
                feedbackService.getFeedback(meetingId, intervieweeId, memberPrincipal.getMember());

        return ResponseEntity.ok().body(responseDto);
    }

    @PutMapping("/{meetingId}/feedback/{intervieweeId}")
    public ResponseEntity<?> setFeedback(@PathVariable int meetingId, @PathVariable int intervieweeId,
                                         @RequestBody @Validated FeedbackSetDataDto feedbackSetDataDto,
                                         @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        feedbackService.setFeedback(meetingId, intervieweeId, memberPrincipal.getMember(), feedbackSetDataDto);
        return ResponseEntity.ok().build();
    }
}
