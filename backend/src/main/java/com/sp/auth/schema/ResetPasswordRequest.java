package com.sp.auth.schema;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResetPasswordRequest {
    private String token;
    private String email;
    private String newPassword;
}
