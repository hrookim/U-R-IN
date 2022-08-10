package com.dongpop.urin.domain.member.repository;

import com.dongpop.urin.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByIdentifier(String identifier);
}
