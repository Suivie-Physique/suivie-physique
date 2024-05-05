package com.sp.users.service;

import com.sp.users.schema.ChangeEmailRequest;
import com.sp.users.schema.ChangePasswordRequest;
import com.sp.users.user.User;
import com.sp.users.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // Checking if the old Password provided is correct
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())){
            // Make Exception better
            throw new IllegalStateException("Old password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())){
            // Make Exception better
            throw new IllegalStateException("Passwords do not match");
        }

        // Updating the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public void changeEmail(ChangeEmailRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // Checking if provided email is already in use
        if (userRepository.findByEmail(request.getNewEmail()).isPresent()){
            // Make Exception better
            throw new IllegalStateException("Email already in use");
        }

        user.setEmail(request.getNewEmail());
        userRepository.save(user);
    }

}
