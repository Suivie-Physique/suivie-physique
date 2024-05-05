package com.sp.users.controller;

import com.sp.users.schema.ChangeEmailRequest;
import com.sp.users.schema.ChangePasswordRequest;
import com.sp.users.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;


    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        usersService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/change-email")
    public ResponseEntity<?> changeEmail(
            @RequestBody ChangeEmailRequest request,
            Principal connectedUser
    ) {
        usersService.changeEmail(request, connectedUser);
        return ResponseEntity.ok().build();
    }


}
