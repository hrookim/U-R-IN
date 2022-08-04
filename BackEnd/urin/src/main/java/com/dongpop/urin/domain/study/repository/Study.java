package com.dongpop.urin.domain.study.repository;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.participant.repository.Participant;
import com.dongpop.urin.global.error.errorcode.StudyErrorCode;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.dongpop.urin.global.error.errorcode.StudyErrorCode.*;

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
    private StudyStatus status;
    private int memberCapacity;

    @OneToMany(mappedBy = "study")
    private List<Participant> participants = new ArrayList<>();

    private LocalDate expirationDate;
    private boolean isOnair;

    @Builder
    public Study(String title, String notice, StudyStatus status, int memberCapacity, LocalDate expirationDate, boolean isOnair) {
        this.title = title;
        this.notice = notice;
        this.status = status;
        this.memberCapacity = memberCapacity;
        this.expirationDate = expirationDate;
        this.isOnair = isOnair;
    }

    public Member getStudyLeader() {
        Member member = null;
        for (Participant participant : participants) {
            if (participant.isLeader()) {
                member = participant.getMember();
                break;
            }
        }
        return member;
    }

    //TODO : 유효성 검사 방법 확인하기
    public void updateStudyInfo(String title, String notice, int memberCapacity, LocalDate expirationDate) {
        this.title = title;
        this.notice = notice;
        if (expirationDate == null) {
            expirationDate = LocalDate.of(2222, 1, 1);
        } else if (expirationDate.isBefore(LocalDate.now())) {
            throw new CustomException(IMPOSSIBLE_SET_EXPIRATION_DATE_BEFORE_TODAY);
        }
        this.expirationDate = expirationDate;
        this.memberCapacity = memberCapacity;
    }

    public void updateStatus(StudyStatus status) {
        this.status = status;
    }

    public void changeOnairStatus() {
        isOnair = !isOnair;
    }
}
