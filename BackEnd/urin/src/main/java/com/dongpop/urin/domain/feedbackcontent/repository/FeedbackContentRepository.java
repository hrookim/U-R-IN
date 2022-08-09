package com.dongpop.urin.domain.feedbackcontent.repository;

import com.dongpop.urin.domain.feedback.entity.Feedback;
import com.dongpop.urin.domain.feedbackcontent.entity.FeedbackContentType;
import com.dongpop.urin.domain.feedbackcontent.entity.FeedbackContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedbackContentRepository extends JpaRepository<FeedbackContent, Integer> {
    //feedback과 number로 조회
    Optional<FeedbackContent> findByFeedbackAndTypeAndNumber(Feedback feedback, FeedbackContentType type, int number);

    //feedback중 주어진 number보다 큰 것들
    List<FeedbackContent> findByFeedbackAndTypeAndNumberGreaterThan(Feedback feedback, FeedbackContentType type, int number);

    //removeAll있나?
}
