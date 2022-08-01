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
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/studies")
public class StudyController {

    private static final String ROOTURI = "/api/v1/studies/";
    private final StudyService studyService;

    @GetMapping
    public ResponseEntity<StudyListDto> getStudyList(@PageableDefault(size=24) Pageable pageable,
                                                     String keyword) {
        return ResponseEntity.ok()
                .body(studyService.getStudyList(pageable, keyword));
    }

    @GetMapping("/{studyId}")
    public ResponseEntity<StudyDetailDto> getStudyDetail(@PathVariable int studyId) {
        return ResponseEntity.ok()
                .body(studyService.getStudyDetail(studyId));
    }

    //TODO: 날짜 받는 양식 정하기!!
    @PostMapping
    public ResponseEntity<StudyIdDto> generateStudy(@RequestBody StudyDataDto studyData,
                                                    @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        log.info("[REQUEST] >>>>> Create Study / studyData : {}", studyData);
        Member member = memberPrincipal.getMember();
        log.info("memberId = {}, memberNickName = {}", member.getId(), member.getNickname());
        StudyIdDto studyIdDto = studyService.generateStudy(studyData, member);
        URI location = URI.create(ROOTURI + studyIdDto.getStudyId());

        return ResponseEntity.created(location)
                .body(studyIdDto);
    }

    @PutMapping("/{studyId}")
    public ResponseEntity<StudyIdDto> editStudy(@PathVariable int studyId, @RequestBody StudyDataDto studyData,
                                                @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        log.info("[REQUEST] >>>>> METHOD {} / studyData : {}", studyData);
        Member member = memberPrincipal.getMember();
        return ResponseEntity.ok()
                .body(studyService.editStudy(member, studyId, studyData));
    }

    @PostMapping("/{studyId}/participants")
    public ResponseEntity<StudyJoinDto> joinStudy(@PathVariable int studyId,
                                                  @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        StudyJoinDto studyJoinDto = studyService.joinStudy(member, studyId);
        URI location = URI.create(ROOTURI + studyJoinDto.getParticipantId());

        return ResponseEntity.created(location)
                .body(studyJoinDto);
    }

    @DeleteMapping("/{studyId}/participants/{participantsId}")
    public ResponseEntity<Void> removeStudyMember(@PathVariable int studyId, @PathVariable int participantsId,
                                                  @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        studyService.removeStudyMember(member, studyId, participantsId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{studyId}")
    public ResponseEntity<StudyStatusDto> changeStudyStatus(@PathVariable int studyId, @RequestBody StudyStateDto status,
                                                            @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        //TODO: Enum binding test
        log.info("[REQUEST] >>>>> Change Study Status / StudyState : {}", status.getStatus().name());
        Member member = memberPrincipal.getMember();
        return ResponseEntity.ok()
                .body(studyService.changeStudyStatus(member, studyId, status.getStatus()));
    }

}
