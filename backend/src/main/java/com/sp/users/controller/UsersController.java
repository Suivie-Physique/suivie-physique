package com.sp.users.controller;

import com.sp.users.schema.*;
import com.sp.users.service.UsersService;
import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.sp.users.role.Role;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/users")
@PreAuthorize("hasAnyRole('ADMIN', 'TRAIT_CHEQUE', 'TRAIT_EFFET', 'EXPLOITANT', 'USER')")
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;

    @GetMapping("/members")
    public ResponseEntity<List<MemberResponse>> getMembers(Principal connectedUser) {
        return ResponseEntity.ok(usersService.getMembers(connectedUser));
    }

    @GetMapping("/members-stats")
    public ResponseEntity<MembersStatsResponse> getMembersStats(Principal connectedUser) {
        return ResponseEntity.ok(usersService.getMembersStats());
    }

    @PatchMapping("/change-member")
    @PreAuthorize("hasAnyAuthority('admin:update','admin:write')")
    public ResponseEntity<?> changeMember(
            @NonNull @RequestBody ChangeMemberRequest request,
            Principal connectedUser
    ){
        usersService.changeMember(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/change-status")
    @PreAuthorize("hasAnyAuthority('admin:update','admin:write')")
    public ResponseEntity<?> changeStatus(
            @NonNull @RequestBody ChangeStatusRequest request,
            Principal connectedUser
    ){
        usersService.changeStatus(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/change-role")
    @PreAuthorize("hasAnyAuthority('admin:update','admin:write')")
    public ResponseEntity<?> changeRole(
            @NonNull @RequestBody ChangeRoleRequest request,
            Principal connectedUser
    ){
        usersService.changeRole(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @NonNull @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        usersService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/change-email")
    public ResponseEntity<?> changeEmail(
            @NonNull @RequestBody ChangeEmailRequest request,
            Principal connectedUser
    ) {
        usersService.changeEmail(request, connectedUser);
        return ResponseEntity.ok().build();
    }

}
