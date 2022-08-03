package com.dongpop.urin.domain.member.controller;

import com.dongpop.urin.domain.member.dto.response.MemberResponseDto;
import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.member.service.MemberService;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyMemberData(@AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();

        return ResponseEntity.ok()
                .body(MemberResponseDto.builder()
                        .id(member.getId())
                        .memberName(member.getMemberName())
                        .nickname(member.getNickname())
                        .build());
    }
}
