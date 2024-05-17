package com.sp.users.service;

import com.sp.auth.token.TokenType;
import com.sp.users.role.Role;
import com.sp.users.schema.*;
import com.sp.users.user.User;
import com.sp.users.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

import java.security.Permission;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import static com.sp.auth.token.TokenType.BEARER;


@Service
@RequiredArgsConstructor
public class UsersService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;




    public List<MemberResponse> getMembers(Principal connectedUser) {
        var activeUser = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        return userRepository
                .findUsersNotWithId(activeUser.getId())
                .stream()
                .map(user -> {
                            var lastConnected = user.getTokens()
                                    .stream()
                                    .filter(token -> !token.isRevoked() && !token.isExpired() && token.getTokenType().equals(BEARER))
                                    .findFirst();
                            if (lastConnected.isPresent()) {
                                return MemberResponse.builder()
                                        .fullName(user.fullName())
                                        .email(user.getEmail())
                                        .role(user.getRole().name())
                                        .enabled(user.isEnabled())
                                        .accountLocked(user.isAccountLocked())
                                        .last_connected(lastConnected.get().getCreatedAt().toString())
                                        .build();
                            }
                            return MemberResponse.builder()
                                    .fullName(user.fullName())
                                    .email(user.getEmail())
                                    .role(user.getRole().name())
                                    .enabled(user.isEnabled())
                                    .accountLocked(user.isAccountLocked())
                                    .last_connected("Never connected").build();

                        }
                ).collect(Collectors.toList());
    }


    public void changeMember(ChangeMemberRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        var targetUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found"));
        Role newRole = Role.valueOf(request.getNewRole());
        targetUser.setRole(newRole);
        targetUser.setAccountLocked(request.isNewStatus());
        userRepository.save(targetUser);
    }


    public void changeStatus(ChangeStatusRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        var targetUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found"));

        targetUser.setAccountLocked(request.isNewStatus());
        userRepository.save(targetUser);
    }

    public void changeRole(ChangeRoleRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        var targetUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found"));

        Role newRole = Role.valueOf(request.getNewRole());
        targetUser.setRole(newRole);
        userRepository.save(targetUser);
    }


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

    public MembersStatsResponse getMembersStats() {


        return MembersStatsResponse.builder()
                .totalMembers(userRepository.findUsersCount())
                .totalActiveMembers(userRepository.findUsersNotLockedCount())
                .totalRoles(userRepository.findUniqueRolesCount())
                .totalMembersConnected(userRepository.findUsersWithBearerTokenCount())
                .build();
    }



}
