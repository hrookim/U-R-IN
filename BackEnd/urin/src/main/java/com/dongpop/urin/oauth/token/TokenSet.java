package com.dongpop.urin.oauth.token;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class TokenSet {
    private String access;
    private String refresh;
}
