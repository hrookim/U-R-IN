package com.dongpop.urin.global.oauth.token;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class TokenSet {
    private String access;
    private String refresh;
}
