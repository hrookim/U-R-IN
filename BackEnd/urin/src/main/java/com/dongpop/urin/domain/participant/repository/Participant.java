package com.dongpop.urin.domain.participant.repository;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.study.repository.Study;
import lombok.Getter;

import javax.persistence.*;

@Getter
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

    private boolean isLeader;
}
