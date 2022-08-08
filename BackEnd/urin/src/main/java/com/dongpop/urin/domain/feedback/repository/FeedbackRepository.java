package com.dongpop.urin.domain.feedback.repository;

import com.dongpop.urin.domain.feedback.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
}
