package com.dongpop.urin.global.oauth.token;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TokenPropertiesTest {

    @Autowired
    TokenProperties tokenProperties;

    @Test
    void Token_Properties_Test() {
        String secret = tokenProperties.getSecret();
        String accessName = tokenProperties.getAccess().getName();
        long accessExpired = tokenProperties.getAccess().getExpiredTime();
        String refreshName = tokenProperties.getRefresh().getName();
        long refreshExpired = tokenProperties.getRefresh().getExpiredTime();

        Assertions.assertThat(secret).isEqualTo("secret1secret1");
        Assertions.assertThat(accessName).isEqualTo("Access-Token");
        Assertions.assertThat(accessExpired).isEqualTo(1800);
        Assertions.assertThat(refreshName).isEqualTo("Refresh-Token");
        Assertions.assertThat(refreshExpired).isEqualTo(1800);
    }
}