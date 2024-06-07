package com.sp.auth.controller;

import com.sp.auth.schema.*;
import com.sp.auth.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
//@SecurityRequirement(name = "bearerAuth") -- commented out because it's not needed here
@Tag(name = "Authentication", description = "Handles all authentication requests")
public class AuthenticationController {

    private final AuthenticationService service;
    private final LogoutHandler logoutHandler;

    @Operation(
            summary = "Register a new user",
            description = "Registers a new user and sends an activation email",
            responses = {
                    @ApiResponse(
                            responseCode = "202",
                            description = "User registered successfully and activation email sent"
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "User already exists"
                    )
            }
    )
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
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(
            @RequestBody @Valid RefreshTokenRequest request
    ) throws IOException {
        return ResponseEntity.ok(service.refreshToken(request));
    }

    @GetMapping("/activate-account")
    public ResponseEntity<?> activateAccount(
            @RequestParam String token
    ) throws MessagingException {
        service.activateAccount(token);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(
            @RequestBody @Valid ResetPasswordRequest request
    ) throws MessagingException {
        service.resetPassword(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/resend-activation-email")
    public ResponseEntity<?> resendActivationEmail(
            @RequestParam String email
    ) throws MessagingException {
        service.resendActivationMail(email);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(
            @RequestParam String email
    ) throws MessagingException {
        service.sendForgotPasswordMail(email);
        return ResponseEntity.ok().build();
    }



    @RequestMapping("/logout")
    public String logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        this.logoutHandler.logout(request, response, authentication);
        return "logout successful ..";
    }

}
