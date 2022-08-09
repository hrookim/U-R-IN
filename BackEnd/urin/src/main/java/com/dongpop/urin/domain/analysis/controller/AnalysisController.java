package com.dongpop.urin.domain.analysis.controller;

import com.dongpop.urin.domain.analysis.dto.request.AnalysisDataDto;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/meeting")
public class AnalysisController {

    private static final String ROOTURI = "/api/v1/meeting";

    @PostMapping("/{meetingId}/analysis")
    public ResponseEntity<?> createNewAIData(@PathVariable int meetingId,
                                                     @RequestBody AnalysisDataDto aiData,
                                                     @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        /*  TODO
            1. 기존 데이터가 있는지 확인
            1-1. 있을 경우 합산 후 평균 다시 구하기
                -> faceData의 경우 데이터 추출필요
                -> poseData는 단순 + 계산
            1-2. 없을 경우 바로 저장
         */

        URI location = URI.create(ROOTURI);

        // TODO : ResponseEntity.created()로 보내면 이점이 뭔지?
        return ResponseEntity.created(location).body(new Object());
    }

    @PutMapping("/{meetingId}/analysis")
    public ResponseEntity<?> updateAIData(@PathVariable int meetingId,
                                          @RequestBody AnalysisDataDto aiData,
                                          @AuthenticationPrincipal MemberPrincipal memberPrincipal) {

        /*  TODO
            1. 기존 데이터 유무 확인
            1-1. 없을 경우 바로 저장
                -> faceData 데이터 추출 후 저장
                -> poseData는 데이터 바로 저장
            1-2. 있는 경우
                -> faceData는 데이터 추출 후 평균(percentage) 재계산
                -> poseData는 단순 합산(+시간 , +poseCount)
         */

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{meetingId}/analysis")
    public ResponseEntity<?> getAIReport(@PathVariable int meetingId,
                                         @AuthenticationPrincipal MemberPrincipal memberPrincipal) {

        return ResponseEntity.ok().build();
    }

}
