package com.dongpop.urin.domain.notification.entity;

import com.dongpop.urin.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Notification {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Embedded
    private NotificationContent notificationContent;

    @Embedded
    private LinkedURL url;

    @Column(nullable = false)
    private Boolean isRead;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType notificationType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member receiver;

    @Builder
    public Notification(NotificationContent notificationContent, LinkedURL url, Boolean isRead, NotificationType notificationType, Member receiver) {
        this.notificationContent = notificationContent;
        this.url = url;
        this.isRead = isRead;
        this.notificationType = notificationType;
        this.receiver = receiver;
    }

    public String getNotificationContent() {
        return notificationContent.getContent();
    }

    public String getUrl() {
        return url.getUrl();
    }
}
