package com.dongpop.urin.global.oauth.service;

import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.member.repository.MemberRepository;
import com.dongpop.urin.global.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByIdentifier(username)
                .orElseThrow(() -> new UsernameNotFoundException("해당 유저가 존재하지 않습니다."));
        return MemberPrincipal.builder()
                .id(member.getId())
                .identifier(member.getIdentifier())
                .memberName(member.getMemberName())
                .nickname(member.getNickname())
                .password(member.getPassword())
                .role(member.getRole())
                .profileImage(member.getProfileImage())
                .build();
    }

    public UserDetails loadMemberById(Integer id) throws UsernameNotFoundException {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("해당 유저가 존재하지 않습니다."));

        return MemberPrincipal.builder()
                .id(member.getId())
                .identifier(member.getIdentifier())
                .memberName(member.getMemberName())
                .nickname(member.getNickname())
                .password(member.getPassword())
                .role(member.getRole())
                .profileImage(member.getProfileImage())
                .build();
    }

}
