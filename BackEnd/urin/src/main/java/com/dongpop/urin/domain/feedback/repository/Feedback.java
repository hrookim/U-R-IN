package com.dongpop.urin.domain.feedback.repository;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import com.dongpop.urin.domain.meeting.repository.Meeting;
import com.dongpop.urin.domain.member.repository.Member;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Table(name = "feedbacks")
@Entity
public class Feedback extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interviewer")
    private Member interviewer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interviewee")
    private Member interviewee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;
}
