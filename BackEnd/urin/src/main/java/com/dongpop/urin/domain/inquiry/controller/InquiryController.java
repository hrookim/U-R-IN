package com.dongpop.urin.domain.inquiry.controller;

import com.dongpop.urin.domain.inquiry.dto.request.InquiryDataDto;
import com.dongpop.urin.domain.inquiry.dto.request.InquiryUpdateDto;
import com.dongpop.urin.domain.inquiry.dto.response.InquiryListDto;
import com.dongpop.urin.domain.inquiry.service.InquiryService;
import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
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
    public ResponseEntity<?> writeInquiry(@PathVariable int studyId,
                                          @Validated @RequestBody InquiryDataDto inquiryDataDto,
                                          @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        inquiryService.writeInquiry(member, studyId, inquiryDataDto);

        //TODO: Created로 변경
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{studyId}/inquiry/{inquiryId}")
    public ResponseEntity<?> updateInquiry(@PathVariable int studyId, @PathVariable int inquiryId,
                                           @Validated @RequestBody InquiryUpdateDto inquiryUpdateDto,
                                           @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        inquiryService.updateFeed(member, studyId, inquiryId, inquiryUpdateDto.getContents());

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{studyId}/inquiry/{inquiryId}")
    public ResponseEntity<?> deleteInquiry(@PathVariable int studyId, @PathVariable int inquiryId,
                                           @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        inquiryService.deleteInquiry(member, studyId, inquiryId);

        return ResponseEntity.noContent().build();
    }

}
