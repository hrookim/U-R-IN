package com.dongpop.urin.domain.member.controller;

import com.dongpop.urin.domain.analysis.service.AnalysisService;
import com.dongpop.urin.domain.member.dto.response.MemberInfoDto;
import com.dongpop.urin.domain.member.dto.response.MemberValidDto;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.member.service.MemberService;
import com.dongpop.urin.global.error.errorcode.CommonErrorCode;
import com.dongpop.urin.global.error.exception.CustomException;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.dongpop.urin.global.error.errorcode.CommonErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;
    private final AnalysisService analysisService;

    @GetMapping("/me")
    public ResponseEntity<MemberInfoDto> getMyMemberData(@AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();

        return ResponseEntity.ok()
                .body(MemberInfoDto.builder()
                        .id(member.getId())
                        .memberName(member.getMemberName())
                        .nickname(member.getNickname())
                        .isPassed(member.getIsPassed())
                        .build());
    }

    @GetMapping("/{memberId}/validation")
    public ResponseEntity<MemberValidDto> checkValidMember(@PathVariable int memberId,
                                                           @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        if (memberPrincipal.getMember().getId() != memberId) {
            throw new CustomException(DO_NOT_HAVE_AUTHENTICATION);
        }
        return ResponseEntity.ok().body(new MemberValidDto(true));
    }

    @PatchMapping("/{memberId}/pass")
    public ResponseEntity<?> changePassStatus(@PathVariable int memberId,
                                              @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        if (memberId != member.getId()) {
            log.info("JWT Member is not equal to PathVariable member.");
            throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
        }

        memberService.changeMemberPassState(memberId);
        analysisService.calculatePassData(memberId);
        return ResponseEntity.ok().build();
    }
}
