package com.sp.auth.token;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum TokenType {
    BEARER("BEARER"),
    TWO_FACTOR("TWO_FACTOR"),
    FORGOT_PASSWORD("FORGOT_PASSWORD");

    @Getter
    private final String tokenType;
}
