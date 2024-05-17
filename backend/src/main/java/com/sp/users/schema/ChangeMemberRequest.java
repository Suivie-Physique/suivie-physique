package com.sp.users.schema;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangeMemberRequest {
    private String email;
    private String newRole;
    private boolean newStatus;
}
