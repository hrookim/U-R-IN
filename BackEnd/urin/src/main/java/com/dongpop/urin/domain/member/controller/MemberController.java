package com.dongpop.urin.domain.member.controller;

import com.dongpop.urin.domain.member.dto.response.MemberInfoDto;
import com.dongpop.urin.domain.member.dto.response.MemberValidDto;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.member.service.MemberService;
import com.dongpop.urin.global.error.errorcode.CommonErrorCode;
import com.dongpop.urin.global.error.exception.CustomException;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.dongpop.urin.global.error.errorcode.CommonErrorCode.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;

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
            //TODO: Exception 401 변경
            throw new RuntimeException();
        }
        return ResponseEntity.ok().body(new MemberValidDto(true));
    }

    @PatchMapping("/{memberId}/pass")
    public ResponseEntity<?> changePassStatus(@PathVariable int memberId,
                                              @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        if (memberId != member.getId()) {
            throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
        }
        member.changeMemberPassState(true);
        return ResponseEntity.ok().build();
    }
}
