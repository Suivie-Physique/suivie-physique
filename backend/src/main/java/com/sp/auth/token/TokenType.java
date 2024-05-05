package com.sp.auth.token;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum TokenType {
    BEARER("Bearer"),
    TWO_FACTOR("TwoFactor");

    @Getter
    private final String tokenType;
}
