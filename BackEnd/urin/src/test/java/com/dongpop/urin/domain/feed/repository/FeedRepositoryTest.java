package com.dongpop.urin.domain.feed.repository;

import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.member.repository.MemberRepository;
import com.dongpop.urin.domain.participant.repository.Participant;
import com.dongpop.urin.domain.participant.repository.ParticipantRepository;
import com.dongpop.urin.domain.study.repository.Study;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class FeedRepositoryTest {

    @Autowired
    EntityManager em;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    StudyRepository studyRepository;

    @Autowired
    ParticipantRepository participantRepository;

    @Autowired
    FeedRepository feedRepository;

    @Test
    void Feed_리스트_테스트() {

        Study study = Study.builder()
                .title("제목")
                .notice("공지~~~")
                .isOnair(false)
                .memberCapacity(6)
                .build();
        study = studyRepository.save(study);

        List<Member> members = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
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

        for (int i = 0; i < 5; i++) {
            Feed parent = Feed.builder()
                    .study(study)
                    .member(members.get(i))
                    .contents("부모 컨텐츠" + i)
                    .build();
            feedRepository.save(parent);
            for (int j = 0; j < 5; j++) {
                Feed child = Feed.builder()
                        .study(study)
                        .member(members.get(j))
                        .contents("자식 컨텐츠" + j)
                        .build();
                child.addParentFeed(parent);
                feedRepository.save(child);
            }
        }

        em.flush();
        em.clear();

        System.out.println("\n\n=============================================================\n\n");

        PageRequest pageRequest = PageRequest.of(0, 2);
        Page<Feed> feedPage = feedRepository.findAllByStudyIdAndParentIsNull(study.getId(), pageRequest);

        assertThat(feedPage.getTotalElements()).isEqualTo(5);
        assertThat(feedPage.toList().size()).isEqualTo(2);
        assertThat(feedPage.toList().get(0).getContents()).isEqualTo("부모 컨텐츠0");
        assertThat(feedPage.toList().get(0).getChildren().size()).isEqualTo(5);
        assertThat(feedPage.toList().get(0).getChildren().get(0).getContents())
                .isEqualTo("자식 컨텐츠0");
    }
}