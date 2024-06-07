package com.sp.users.model;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_WRITE("admin:write"),
    ADMIN_DELETE("admin:delete"),
    ADMIN_UPDATE("admin:update"),
    USER_READ("user:read"),
    EXPLOITANT_READ("exploitant:read"),
    EXPLOITANT_WRITE("exploitant:write"),
    EXPLOITANT_DELETE("exploitant:delete"),
    EXPLOITANT_UPDATE("exploitant:update"),
    TRAIT_CHEQUE_READ("trait_cheque:read"),
    TRAIT_CHEQUE_WRITE("trait_cheque:write"),
    TRAIT_CHEQUE_DELETE("trait_cheque:delete"),
    TRAIT_CHEQUE_UPDATE("trait_cheque:update"),
    TRAIT_EFFET_READ("trait_effet:read"),
    TRAIT_EFFET_WRITE("trait_effet:write"),
    TRAIT_EFFET_DELETE("trait_effet:delete"),
    TRAIT_EFFET_UPDATE("trait_effet:update");

    @Getter
    private final String permission;
}
