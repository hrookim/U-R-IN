package com.dongpop.urin.domain.analysis.entity;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import com.dongpop.urin.domain.meeting.entity.Meeting;
import com.dongpop.urin.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "analysis_data")
@Entity
public class AnalysisData extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interviewee")
    private Member interviewee;

    private int time;

    @Builder
    public AnalysisData(Meeting meeting, Member interviewee, int time) {
        this.meeting = meeting;
        this.interviewee = interviewee;
        this.time = time;
    }

    public void sumTime(int time) {
        this.time += time;
    }
}
