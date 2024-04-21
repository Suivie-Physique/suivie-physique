package com.sp.auth.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationRequest {

    @Email(message = "Invalid email")
    @NotEmpty(message = "Email cannot be empty")
    @NotEmpty(message = "Email cannot be blank")
    private String email;

    @NotEmpty(message = "Password cannot be empty")
    @NotEmpty(message = "Password cannot be blank")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
}
