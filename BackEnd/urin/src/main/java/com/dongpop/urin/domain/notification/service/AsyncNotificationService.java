package com.dongpop.urin.domain.notification.service;

import com.dongpop.urin.domain.notification.repository.EmitterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Service
public class AsyncNotificationService {

    private final EmitterRepository emitterRepository;

    @Async
    public void sendNotification(SseEmitter emitter, String eventId, String emitterId, Object data) {
        try {
            log.info("Send Notification : eventId = {}, data = {}", eventId, data);
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .data(data));
        } catch (IOException exception) {
            emitterRepository.deleteById(emitterId);
        }
    }

}
