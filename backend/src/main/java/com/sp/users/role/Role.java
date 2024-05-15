package com.sp.users.role;


import com.sp.users.permission.Permission;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.sp.users.permission.Permission.*;

@RequiredArgsConstructor
public enum Role {

    USER(Set.of(
            USER_READ,
            EXPLOITANT_READ
    )),
    ADMIN(Set.of(
            ADMIN_READ,
            ADMIN_WRITE,
            ADMIN_DELETE,
            ADMIN_UPDATE,
            EXPLOITANT_READ,
            EXPLOITANT_WRITE,
            EXPLOITANT_DELETE,
            EXPLOITANT_UPDATE,
            TRAIT_CHEQUE_READ,
            TRAIT_CHEQUE_WRITE,
            TRAIT_CHEQUE_DELETE,
            TRAIT_CHEQUE_UPDATE,
            TRAIT_EFFET_READ,
            TRAIT_EFFET_WRITE,
            TRAIT_EFFET_DELETE,
            TRAIT_EFFET_UPDATE
    )),
    EXPLOITANT(Set.of(
            EXPLOITANT_READ,
            EXPLOITANT_WRITE,
            EXPLOITANT_DELETE,
            EXPLOITANT_UPDATE
    )),
    TRAIT_CHEQUE(Set.of(
            TRAIT_CHEQUE_READ,
            TRAIT_CHEQUE_WRITE,
            TRAIT_CHEQUE_DELETE,
            TRAIT_CHEQUE_UPDATE
    )),
    TRAIT_EFFET(Set.of(
            TRAIT_EFFET_READ,
            TRAIT_EFFET_WRITE,
            TRAIT_EFFET_DELETE,
            TRAIT_EFFET_UPDATE
    ));

    @Getter
    private final Set<Permission> permissions;



    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = permissions
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }

}
