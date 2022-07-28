package com.dongpop.urin.domain.participant.repository;

import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.member.repository.MemberRepository;
import com.dongpop.urin.domain.study.repository.Study;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ParticipantRepositoryTest {

    @Autowired
    StudyRepository studyRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ParticipantRepository participantRepository;

    @Test
    void 스터디리더_찾기_테스트() {
        List<Study> studies = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Study curStudy = Study.builder()
                    .title("제목" + i)
                    .notice("내용~~~" + i)
                    .isOnair(false)
                    .memberCapacity(6)
                    .build();
            studies.add(curStudy);
            studyRepository.save(curStudy);
        }
        List<Member> members = new ArrayList<>();
        for (int i = 0; i < 25; i++) {
            Member curMember = Member.builder()
                    .nickname("이름" + i)
                    .password("pass" + i)
                    .role("user")
                    .build();
            members.add(curMember);
            memberRepository.save(curMember);
        }
        for (int i = 0; i < 5; i++) {
            Study curS = studies.get(i);
            for (int j = 0; j < 5; j++) {
                Member curM = members.get(i * 5 + j);
                boolean isLeader = j == 0 ? true : false;
                Participant participant = Participant.makeParticipant(curM, curS, isLeader);
                participantRepository.save(participant);
            }
        }
        Study study1 = studyRepository.findById(1).get();
        Study study2 = studyRepository.findById(2).get();
        Member leader1 = memberRepository.findById(1).get();
        Member leader2 = memberRepository.findById(6).get();

        Participant participant1 = participantRepository.findLeader(study1.getId()).get();
        Participant participant2 = participantRepository.findLeader(study2.getId()).get();

        assertThat(participant1.isLeader()).isTrue();
        assertThat(participant1.getMember().getId()).isEqualTo(leader1.getId());
        assertThat(participant2.isLeader()).isTrue();
        assertThat(participant2.getMember().getId()).isEqualTo(leader2.getId());
    }
}