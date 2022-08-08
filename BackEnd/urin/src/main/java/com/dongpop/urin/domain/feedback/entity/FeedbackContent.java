package com.dongpop.urin.domain.feedback.entity;

import com.dongpop.urin.domain.feedback.entity.Feedback;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "feedback_contents")
public class FeedbackContent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedback_id")
    private Feedback feedback;

    @Column(nullable = false)
    private String question;
    @Column(nullable = false)
    private String answer;

    @Enumerated(EnumType.STRING)
    private FeedbackType type;
}
