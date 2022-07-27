package com.dongpop.urin.domain.inquiry.controller;

import com.dongpop.urin.domain.inquiry.dto.request.InquiryDataDto;
import com.dongpop.urin.domain.inquiry.dto.response.InquiryListDto;
import com.dongpop.urin.domain.inquiry.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/studies")
public class InquiryController {

    private final InquiryService inquiryService;

    @GetMapping("/{studyId}/inquiry")
    public ResponseEntity<InquiryListDto> getStudyInquiries(Pageable pageable, @PathVariable int studyId) {
        return ResponseEntity.ok()
                .body(inquiryService.getStudyInquiries(studyId, pageable));
    }

    @PostMapping("/{studyId}/inquiry")
    public ResponseEntity<?> writeInquiry(@PathVariable int studyId, @RequestBody InquiryDataDto inquiryDataDto) {
        int memberId = 1;
        inquiryService.writeInquiry(memberId, studyId, inquiryDataDto);

        //TODO: Created로 변경
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{studyId}/inquiry/{inquiryId}")
    public ResponseEntity<?> updateInquiry(@PathVariable int studyId, @PathVariable int inquiryId, @RequestBody String contents) {
        int memberId = 1;
        inquiryService.updateFeed(memberId, studyId, inquiryId, contents);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{studyId}/inquiry/{inquiryId}")
    public ResponseEntity<?> deleteInquiry(@PathVariable int studyId, @PathVariable int inquiryId) {
        int memberId = 1;
        inquiryService.deleteInquiry(memberId, studyId, inquiryId);

        return ResponseEntity.noContent().build();
    }
}
