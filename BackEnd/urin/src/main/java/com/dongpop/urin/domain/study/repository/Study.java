package com.dongpop.urin.domain.study.repository;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import com.dongpop.urin.domain.participant.repository.Participant;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "studies")
public class Study extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String notice;

    @Enumerated(EnumType.STRING)
    private StudyState status;

    private int memberCapacity;

    @OneToMany(mappedBy = "study")
    private List<Participant> participants = new ArrayList<>();

    private boolean isOnair;

    @Builder
    public Study(String title, String notice, StudyState status, int memberCapacity, boolean isOnair) {
        this.title = title;
        this.notice = notice;
        this.status = status;
        this.memberCapacity = memberCapacity;
        this.isOnair = isOnair;
    }

    //TODO : 유효성 검사 방법 확인하기
    public void updateStudyInfo(String title, String notice, StudyState status, int memberCapacity) {
        this.title = title;
        this.notice = notice;
        this.status = status;
        this.memberCapacity = memberCapacity;
    }

    public void updateStatus(StudyState status) {
        this.status = status;
    }
}
