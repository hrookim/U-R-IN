package com.dongpop.urin.domain.notification.dto;

import com.dongpop.urin.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Getter
@Builder
public class NotificationEventDto {
    private Member receiver;
    private String contents;
    private String url;
}
