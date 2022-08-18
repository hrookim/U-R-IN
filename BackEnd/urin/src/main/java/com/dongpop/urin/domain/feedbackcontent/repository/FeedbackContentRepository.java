package com.dongpop.urin.domain.feedbackcontent.repository;

import com.dongpop.urin.domain.feedback.entity.Feedback;
import com.dongpop.urin.domain.feedbackcontent.entity.FeedbackContent;
import com.dongpop.urin.domain.feedbackcontent.entity.FeedbackContentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedbackContentRepository extends JpaRepository<FeedbackContent, Integer> {
    Optional<FeedbackContent> findByFeedbackAndTypeAndNumber(Feedback feedback, FeedbackContentType type, int number);

    List<FeedbackContent> findByFeedbackAndTypeAndNumberGreaterThan(Feedback feedback, FeedbackContentType type, int number);
}
