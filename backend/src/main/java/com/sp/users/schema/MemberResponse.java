package com.sp.users.schema;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberResponse {

    private String fullName;
    private String email;
    private String role;
    private boolean enabled;
    private boolean accountLocked;
    private String last_connected;
}
