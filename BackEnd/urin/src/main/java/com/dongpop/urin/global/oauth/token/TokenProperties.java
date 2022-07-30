package com.dongpop.urin.global.oauth.token;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@Getter
@RequiredArgsConstructor
@ConstructorBinding
@ConfigurationProperties(value = "token", ignoreInvalidFields = true) //TODO: 바인딩 테스트
public final class TokenProperties {
    private final String secret;
    private final Access access;
    private final Refresh refresh;

    @Getter
    @RequiredArgsConstructor
    public static final class Access {
        private final String name;
        private final long expiredTime;
        private final long expiredTimeMilli;
    }

    @Getter
    @RequiredArgsConstructor
    public static final class Refresh {
        private final String name;
        private final long expiredTime;
        private final long expiredTimeMilli;
    }
}
