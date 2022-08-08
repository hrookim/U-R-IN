package com.dongpop.urin.domain.study.controller;

import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.study.dto.request.StudyDataDto;
import com.dongpop.urin.domain.study.dto.request.StudyStateDto;
import com.dongpop.urin.domain.study.dto.response.*;
import com.dongpop.urin.domain.study.service.StudyService;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/studies")
public class StudyController {

    private static final String ROOTURI = "/api/v1/studies/";
    private final StudyService studyService;

    @GetMapping
    public ResponseEntity<StudyListDto> getStudyList(@PageableDefault(size=24) Pageable pageable,
                                                     String keyword, Boolean isRecruiting) {
        return ResponseEntity.ok()
                .body(studyService.getStudyList(pageable, keyword, isRecruiting));
    }

    @GetMapping("/{studyId}")
    public ResponseEntity<StudyDetailDto> getStudyDetail(@PathVariable int studyId) {
        return ResponseEntity.ok()
                .body(studyService.getStudyDetail(studyId));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyStudies(@AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        StudyMyListDto studyMyListDto = studyService.getMyStudy(memberPrincipal.getMember());
        return ResponseEntity.ok().body(studyMyListDto);
    }

    @PostMapping
    public ResponseEntity<StudyIdDto> generateStudy(@Validated @RequestBody StudyDataDto studyData,
                                                    @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        StudyIdDto studyIdDto = studyService.generateStudy(studyData, member);
        URI location = URI.create(ROOTURI + studyIdDto.getStudyId());

        return ResponseEntity.created(location)
                .body(studyIdDto);
    }

    @PutMapping("/{studyId}")
    public ResponseEntity<StudyIdDto> editStudy(@PathVariable int studyId, @Validated @RequestBody StudyDataDto studyData,
                                                @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        log.info("[REQUEST] >>>>> METHOD {} / studyData : {}", studyData);
        Member member = memberPrincipal.getMember();
        return ResponseEntity.ok()
                .body(studyService.editStudy(member, studyId, studyData));
    }

    @PatchMapping("/{studyId}")
    public ResponseEntity<StudyStatusDto> changeStudyStatus(@PathVariable int studyId, @Validated @RequestBody StudyStateDto status,
                                                            @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        return ResponseEntity.ok()
                .body(studyService.changeStudyStatus(member, studyId, status.getStatus()));
    }

}
