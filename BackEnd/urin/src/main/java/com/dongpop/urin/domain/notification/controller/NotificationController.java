package com.dongpop.urin.domain.notification.controller;

import com.dongpop.urin.domain.notification.service.NotificationService;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@RestController
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "api/v1/notification", produces = "text/event-stream")
    public ResponseEntity<SseEmitter> subscribe(int memberId,
                                                @RequestHeader(
                                                        value = "Last-Event-Id",
                                                        required = false,
                                                        defaultValue = "") String lastEventId) {
        return ResponseEntity.ok()
                .body(notificationService.subscribe(memberId, lastEventId));
    }
}
