package com.dongpop.urin.domain.notification.dto;

import com.dongpop.urin.domain.notification.entity.Notification;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificationResponseDto {
    private String content;
    private String url;

    public static NotificationResponseDto create(Notification notification) {
        return NotificationResponseDto.builder()
                .content(notification.getContent())
                .url(notification.getUrl())
                .build();
    }
}
