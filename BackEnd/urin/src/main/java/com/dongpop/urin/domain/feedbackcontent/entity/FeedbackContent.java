package com.dongpop.urin.domain.feedbackcontent.entity;

import com.dongpop.urin.domain.feedback.entity.Feedback;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "feedback_contents")
public class FeedbackContent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedback_id")
    private Feedback feedback;

    private int number;
    @Column(nullable = false)
    private String question;
    @Column(nullable = false)
    private String answer;

    @Enumerated(EnumType.STRING)
    private FeedbackContentType type;

    public void updateContentData(int number, String question, String answer, FeedbackContentType type) {
        this.number = number;
        this.question = question;
        this.answer = answer;
        this.type = type;
    }

    public void setFeedback(Feedback feedback) {
        this.feedback = feedback;
        if (feedback != null) {
            feedback.getFeedbackContents().add(this);
        }
    }
}
