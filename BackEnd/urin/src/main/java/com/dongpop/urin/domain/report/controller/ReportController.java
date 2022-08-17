package com.dongpop.urin.domain.report.controller;

import com.dongpop.urin.domain.report.dto.response.ReportDataDto;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/meeting")
public class ReportController {

    @GetMapping("/{meetingId}/report")
    public ResponseEntity<ReportDataDto> getReport(@PathVariable int meetingId,
                                                   @AuthenticationPrincipal MemberPrincipal memberPrincipal) {



        return ResponseEntity.ok(new ReportDataDto());
    }
}
