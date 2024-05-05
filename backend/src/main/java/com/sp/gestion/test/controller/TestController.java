package com.sp.gestion.test.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
public class TestController {


    @GetMapping
    @PreAuthorize("hasAnyAuthority('admin:read', 'user:read')")
    public String get() {
        return "GET:: /test";
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('admin:write')")
    public String post() {
        return "POST:: /test";
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('admin:update')")
    public String put() {
        return "PUT:: /test";
    }

    @DeleteMapping
    @PreAuthorize("hasAnyAuthority('admin:delete')")
    public String delete() {
        return "DELETE:: /test";
    }
}
