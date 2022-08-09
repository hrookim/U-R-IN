package com.dongpop.urin.domain.meeting.entity;

import com.dongpop.urin.domain.study.entity.Study;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "meetings")
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Meeting {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;

    private LocalDateTime endedAt;

    public Meeting(Study study) {
        this.study = study;
    }

    public void closeMeeting() {
        endedAt = LocalDateTime.now();
    }
}
