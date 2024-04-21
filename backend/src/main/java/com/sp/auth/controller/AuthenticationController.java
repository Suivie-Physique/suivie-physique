package com.sp.auth.controller;

import com.sp.auth.model.AuthenticationRequest;
import com.sp.auth.model.AuthenticationResponse;
import com.sp.auth.model.RegisterRequest;
import com.sp.auth.service.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication Controller", description = "Handles all authentication requests")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody @Valid RegisterRequest request
    ) throws MessagingException {
        service.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody @Valid AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/activate-account")
    public ResponseEntity<?> activateAccount(
            @RequestParam String token
    ) throws MessagingException {
        service.activateAccount(token);
        return ResponseEntity.ok().build();
    }

    @RequestMapping("/forgotPassword")
    public String forgotPassword() {
        return "forgotPassword";
    }

    @RequestMapping("/resetPassword")
    public String resetPassword() {
        return "resetPassword";
    }

    @RequestMapping("/logout")
    public String logout() {
        return "logout";
    }

}
