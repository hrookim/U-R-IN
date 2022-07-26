package com.dongpop.urin.domain.inquiry.controller;

import com.dongpop.urin.domain.inquiry.dto.request.InquiryDataDto;
import com.dongpop.urin.domain.inquiry.dto.response.InquiryListDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/studies")
public class InquiryController {

    @GetMapping("/{studyId}/qna")
    public ResponseEntity<InquiryListDto> getStudyQNAs(Pageable pageable, @PathVariable int studyId) {
        ResponseEntity<InquiryListDto> response = ResponseEntity
                .ok()
                .body(new InquiryListDto());

        return response;
    }

    @PostMapping("/{studyId}/qna")
    public ResponseEntity<?> writeQNA(@PathVariable int studyId, InquiryDataDto qnaDataDto) {

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{studyId}/qna/{qnaId}")
    public ResponseEntity<?> updateQNA(@PathVariable int studyId, @PathVariable int qnaId, InquiryDataDto qnaDataDto) {
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{studyId}/qna/{qnaId}")
    public ResponseEntity<?> deleteQNA(@PathVariable int studyId, @PathVariable int qnaId) {
        return ResponseEntity.noContent().build();
    }
}
