package com.sp.users.schema;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangeRoleRequest {
    private String email;
    private String newRole;
}
