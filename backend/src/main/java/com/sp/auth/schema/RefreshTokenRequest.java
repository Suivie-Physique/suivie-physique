package com.sp.auth.schema;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RefreshTokenRequest {
    private String refreshToken;
    private String accessToken;
}
