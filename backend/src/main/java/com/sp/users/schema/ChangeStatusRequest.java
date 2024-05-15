package com.sp.users.schema;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangeStatusRequest {
    private String email;
    private boolean newStatus;
}
