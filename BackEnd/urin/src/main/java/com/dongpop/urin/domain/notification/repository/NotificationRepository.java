package com.dongpop.urin.domain.notification.repository;

import com.dongpop.urin.domain.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
}
