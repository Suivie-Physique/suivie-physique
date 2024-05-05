package com.sp.gestion.test.controller;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAnyRole('ADMIN')")
public class AdminController {

    @GetMapping
    @PreAuthorize("hasAnyAuthority('admin:read')")
    public String get() {
        return "GET:: /admin";
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('admin:write')")
    public String post() {
        return "POST:: /admin";
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('admin:update')")
    public String put() {
        return "PUT:: /admin";
    }

    @DeleteMapping
    @PreAuthorize("hasAnyAuthority('admin:delete')")
    public String delete() {
        return "DELETE:: /admin";
    }
}
