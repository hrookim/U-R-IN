package com.dongpop.urin.domain.study.controller;

import com.dongpop.urin.domain.study.dto.request.StudyDataDto;
import com.dongpop.urin.domain.study.dto.request.StudyStateDto;
import com.dongpop.urin.domain.study.dto.response.*;
import com.dongpop.urin.domain.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<StudyListDto> getStudyList(Pageable pageable, String keyword) {
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
    public ResponseEntity<StudyIdDto> generateStudy(@RequestBody StudyDataDto studyData) {
        log.info("[REQUEST] >>>>> Create Study / studyData : {}", studyData);
        //TODO : 회원 번호 뽑아오기
        StudyIdDto studyIdDto = studyService.generateStudy(studyData, 1);
        URI location = URI.create(ROOTURI + studyIdDto.getStudyId());

        return ResponseEntity.created(location)
                .body(studyIdDto);
    }

    @PutMapping("/{studyId}")
    public ResponseEntity<StudyIdDto> editStudy(@PathVariable int studyId, @RequestBody StudyDataDto studyData) {
        log.info("[REQUEST] >>>>> Edit Study / studyData : {}", studyData);
        return ResponseEntity.ok()
                .body(studyService.editStudy(studyId, studyData));
    }

    @PostMapping("/{studyId}/participants")
    public ResponseEntity<StudyJoinDto> joinStudy(@PathVariable int studyId) {
        //TODO: 회원 번호 뽑아오기
        StudyJoinDto studyJoinDto = studyService.joinStudy(1, studyId);
        URI location = URI.create(ROOTURI + studyJoinDto.getParticipantId());

        return ResponseEntity.created(location)
                .body(studyJoinDto);
    }

    @DeleteMapping("/{studyId}/participants/{participantsId}")
    public ResponseEntity<Void> removeStudyMember(@PathVariable int studyId, @PathVariable int participantsId) {
        //TODO: 회원 번호 뽑아오기
        studyService.removeStudyMember(1, studyId, participantsId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{studyId}")
    public ResponseEntity<StudyStatusDto> changeStudyStatus(@PathVariable int studyId, @RequestBody StudyStateDto status) {
        //TODO: Enum binding test
        log.info("[REQUEST] >>>>> Change Study Status / StudyState : {}", status.getStatus().name());
        return ResponseEntity.ok()
                .body(studyService.changeStudyStatus(studyId, status.getStatus()));
    }

}
