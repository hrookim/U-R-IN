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

    private String content;
    private String url;

    @Builder
    public Notification(String content, String url) {
        this.content = content;
        this.url = url;
    }
}
