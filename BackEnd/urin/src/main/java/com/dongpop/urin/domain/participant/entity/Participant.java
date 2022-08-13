package com.dongpop.urin.domain.participant.entity;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.study.entity.Study;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "participants")
public class Participant extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @Column(updatable = false)
    private boolean isLeader;

    private Boolean withdrawal;

    @Builder
    private Participant(Member member, boolean isLeader) {
        this.member = member;
        this.isLeader = isLeader;
    }

    @PrePersist
    public void prePersist() {
        if (getWithdrawal() == null) {
            withdrawal = false;
        }
    }

    public void addStudy(Study study) {
        this.study = study;
        study.getParticipants().add(this);
    }

    public static Participant makeParticipant(Member member, Study study, boolean isLeader) {
        Participant ret = Participant.builder()
                .isLeader(isLeader)
                .member(member)
                .build();
        ret.addStudy(study);
        return ret;
    }

    public void withdrawStudy() {
        this.withdrawal = true;
        study.getParticipants().remove(this);
    }

    public void joinStudy() {
        this.withdrawal = false;
        if (study.getParticipants().lastIndexOf(this) < 0) {
            study.getParticipants().add(this);
        }
    }
}
