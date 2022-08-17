package com.dongpop.urin.domain.notification.service;

import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.notification.dto.NotificationEventDto;
import com.dongpop.urin.domain.notification.entity.Notification;
import com.dongpop.urin.domain.notification.dto.NotificationResponseDto;
import com.dongpop.urin.domain.notification.repository.EmitterRepository;
import com.dongpop.urin.domain.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class NotificationService {

    private final EmitterRepository emitterRepository;
    private final NotificationRepository notificationRepository;

    private static final long TIMEOUT = 60 * 60 * 1000;

    public SseEmitter subscribe(Integer memberId, String lastEventId) {
        String emitterId = makeTimeIncludeId(memberId);
        SseEmitter emitter = makeNewEmitter(emitterId);

        // 503 에러를 방지하기 위한 더미 이벤트 전송
        String eventId = makeTimeIncludeId(memberId);
        sendNotification(emitter, eventId, emitterId, "EventStream Created. [userId=" + memberId + "]");

        // 클라이언트가 미수신한 Event 목록이 존재할 경우 전송하여 Event 유실을 예방
        if (hasLostData(lastEventId)) {
            log.info("Send Lost data : lastEventId = {}", lastEventId);
            sendLostData(lastEventId, memberId, emitterId, emitter);
        }
        return emitter;
    }

    public void send(NotificationEventDto notificationEventDto) {
        Notification notification = notificationRepository.save(Notification.builder()
                .content(notificationEventDto.getContents())
                .url(notificationEventDto.getUrl()).build());

        Member receiver = notificationEventDto.getReceiver();
        String receiverId = String.valueOf(receiver.getId());
        String eventId = makeTimeIncludeId(receiver.getId());

        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitterStartWithByMemberId(receiverId);
        for (Map.Entry<String, SseEmitter> entry : emitters.entrySet()) {
            NotificationResponseDto event = NotificationResponseDto.create(notification);
            emitterRepository.saveEventCache(entry.getKey(), event);
            sendNotification(entry.getValue(), eventId, entry.getKey(), event);
        }
    }

    @TransactionalEventListener
    public void handleNotification(NotificationEventDto notificationEventDto) {
        send(notificationEventDto);
    }

    private SseEmitter makeNewEmitter(String emitterId) {
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(TIMEOUT));
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));
        return emitter;
    }

    private String makeTimeIncludeId(Integer memberId) {
        return memberId + "_" + System.currentTimeMillis();
    }

    private void sendNotification(SseEmitter emitter, String eventId, String emitterId, Object data) {
        try {
            log.info("Send Notification : eventId = {}, data = {}", eventId, data);
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .data(data));
        } catch (IOException exception) {
            emitterRepository.deleteById(emitterId);
        }
    }

    private boolean hasLostData(String lastEventId) {
        return !lastEventId.isEmpty();
    }

    private void sendLostData(String lastEventId, Integer memberId, String emitterId, SseEmitter emitter) {
        log.info("Send Lost Notification : lastEventId = {}, data = {}", emitterId, lastEventId);
        Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(memberId));
        eventCaches.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEach(entry -> sendNotification(emitter, entry.getKey(), emitterId, entry.getValue()));
    }
}
