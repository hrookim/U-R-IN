package com.dongpop.urin.domain.study.repository;

import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.member.repository.MemberRepository;
import com.dongpop.urin.domain.participant.repository.Participant;
import com.dongpop.urin.domain.participant.repository.ParticipantRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class StudyRepositoryTest {

    @Autowired
    EntityManager em;
    @Autowired
    StudyRepository studyRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ParticipantRepository participantRepository;

    @Test
    void 스터디_리스트_테스트() throws Exception {

        List<Study> studies = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
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
        for (int i = 0; i < 100; i++) {
            Member curMember = Member.builder()
                    .nickname("이름" + i)
                    .password("pass" + i)
                    .role("user")
                    .build();
            members.add(curMember);
            memberRepository.save(curMember);
        }

        for (int i = 0; i < 20; i++) {
            Study curS = studies.get(i);
            for (int j = 0; j < 5; j++) {
                Member curM = members.get(i * 5 + j);
                boolean isLeader = j == 0 ? true : false;
                Participant participant = Participant.makeParticipant(curM, curS, isLeader);
                participantRepository.save(participant);
            }
        }

        PageRequest pageRequest = PageRequest.of(0, 9);
        Page<Study> studyPage = studyRepository.findAll(pageRequest);

        assertThat(studyPage.getTotalElements()).isEqualTo(20);
        assertThat(studyPage.toList().size()).isEqualTo(9);
        assertThat(studyPage.toList().get(0).getTitle()).isEqualTo("제목0");
    }

    @Test
    void 스터디_상세_테스트() {
        Study study = Study.builder()
                .title("스터디")
                .notice("공지")
                .memberCapacity(6)
                .isOnair(false)
                .build();
        Integer studyId = studyRepository.save(study).getId();
        em.flush();
        em.clear();

        List<Member> members = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Member curMember = Member.builder()
                    .nickname("이름" + i)
                    .password("pass" + i)
                    .role("user")
                    .build();
            members.add(curMember);
            memberRepository.save(curMember);
        }

        for (int j = 0; j < 5; j++) {
            Member curM = members.get(j);
            boolean isLeader = j == 0 ? true : false;
            Participant participant = Participant.makeParticipant(curM, study, isLeader);
            participantRepository.save(participant);
        }

        Study findStudy = studyRepository.findById(studyId)
                .orElseThrow(() -> new NoSuchElementException());

        assertThat(findStudy.getTitle()).isEqualTo("스터디");
        assertThat(findStudy.getNotice()).isEqualTo("공지");
        assertThat(findStudy.getMemberCapacity()).isEqualTo(6);
        assertThat(findStudy.getParticipants().size()).isEqualTo(5);
    }

}