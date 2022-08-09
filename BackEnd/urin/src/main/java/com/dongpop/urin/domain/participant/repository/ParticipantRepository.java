package com.dongpop.urin.domain.participant.repository;

import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.participant.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
    @Query("SELECT p FROM Participant p" +
            " where p.study.id = :studyId" +
            " AND p.isLeader IS TRUE")
    Optional<Participant> findLeader(int studyId);

    List<Participant> findAllByMember(Member member);
}
