package com.sp.users.schema;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MembersStatsResponse {
    private Long totalMembers;
    private Long totalActiveMembers;
    private Long totalRoles;
    private Long totalMembersConnected;
}
