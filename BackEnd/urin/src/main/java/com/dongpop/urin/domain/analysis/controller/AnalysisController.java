package com.dongpop.urin.domain.analysis.controller;

import com.dongpop.urin.domain.analysis.dto.request.AnalysisDataDto;
import com.dongpop.urin.domain.analysis.service.AnalysisService;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/meeting")
public class AnalysisController {

    private final AnalysisService analysisService;

    @PutMapping("/{meetingId}/analysis")
    public ResponseEntity<?> updateAIData(@PathVariable int meetingId,
                                          @RequestBody AnalysisDataDto aiData,
                                          @AuthenticationPrincipal MemberPrincipal memberPrincipal) {

        analysisService.setAnalysisData(meetingId, memberPrincipal.getMember().getId(), aiData);

        return ResponseEntity.ok().build();
    }

}
