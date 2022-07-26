package com.dongpop.urin.domain.study.controller;

import com.dongpop.urin.domain.study.dto.request.StudyDataDto;
import com.dongpop.urin.domain.study.dto.request.StudyStatusRequestDto;
import com.dongpop.urin.domain.study.dto.response.StudyDetailDto;
import com.dongpop.urin.domain.study.dto.response.StudyIdDto;
import com.dongpop.urin.domain.study.dto.response.StudyListDto;
import com.dongpop.urin.domain.study.dto.response.StudyStatusDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/v1/studies")
public class StudyController {

    @GetMapping
    public ResponseEntity<StudyListDto> getStudyList(Pageable pageable, String keyword) {
        ResponseEntity<StudyListDto> response = ResponseEntity
                .ok()
                .body(new StudyListDto());

        return response;
    }

    @GetMapping("/{studyId}")
    public ResponseEntity<StudyDetailDto> getStudyDetail(@PathVariable int studyId) {
        ResponseEntity<StudyDetailDto> response = ResponseEntity
                .ok()
                .body(new StudyDetailDto());

        return response;

    }

    @PostMapping
    public ResponseEntity<StudyIdDto> generateStudy(StudyDataDto studyData) {
        ResponseEntity<StudyIdDto> response = ResponseEntity
                .ok()
                .body(new StudyIdDto());

        return response;
    }

    @PutMapping("/{studyId}")
    public ResponseEntity<StudyIdDto> editStudy(@PathVariable int studyId, StudyDataDto studyData) {
        ResponseEntity<StudyIdDto> response = ResponseEntity
                .ok()
                .body(new StudyIdDto());

        return response;
    }

    @PostMapping("/{studyId}/participants")
    public ResponseEntity<StudyIdDto> joinStudy() {
        ResponseEntity<StudyIdDto> response = ResponseEntity
                .ok()
                .body(new StudyIdDto());

        return response;
    }

    @DeleteMapping("/{studyId}/participants/{participantsId}")
    public ResponseEntity<?> removeStudyMember(@PathVariable int studyId, @PathVariable int participantsId) {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{studyId}")
    public ResponseEntity<StudyStatusDto> changeStudyStatus(StudyStatusRequestDto studyStatus) {
        ResponseEntity<StudyStatusDto> response = ResponseEntity
                .ok()
                .body(new StudyStatusDto());

        return response;
    }



}
