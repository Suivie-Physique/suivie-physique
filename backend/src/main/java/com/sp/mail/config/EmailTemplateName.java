package com.sp.mail.config;

import lombok.Getter;

public enum EmailTemplateName {

    ACTIVATE_ACCOUNT("activate_account"),
    FORGOT_PASSWORD("forgot_password");

    @Getter
    private final String name;

    EmailTemplateName(String name) {
        this.name = name;
    }
}
