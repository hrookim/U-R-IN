package com.dongpop.urin.domain.member.service;

import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.member.repository.MemberRepository;
import com.dongpop.urin.global.error.errorcode.CommonErrorCode;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public void signUp(Member member) {
        memberRepository.save(member);
    }

    @Transactional
    public void changeMemberPassState(int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(CommonErrorCode.NO_SUCH_ELEMENTS));
        member.changeMemberPassState(true);
    }
}
