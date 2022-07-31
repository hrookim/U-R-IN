package com.dongpop.urin.global.config.properties;

import com.dongpop.urin.oauth.token.TokenProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(value = {TokenProperties.class})
public class PropertiesConfig {
}
