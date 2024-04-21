package com.sp.auth.service;

import com.sp.auth.model.AuthenticationRequest;
import com.sp.auth.model.AuthenticationResponse;
import com.sp.auth.model.RegisterRequest;
import com.sp.auth.role.RoleRepository;
import com.sp.auth.token.Token;
import com.sp.auth.token.TokenRepository;
import com.sp.auth.user.User;
import com.sp.auth.user.UserRepository;
import com.sp.mail.config.EmailTemplateName;
import com.sp.mail.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    // Repositories
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    // Services & Beans
    private final MailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;

    public void register(RegisterRequest request) throws MessagingException {
        // Register the user
        var userRole = roleRepository
                .findByName("USER")
                .orElseThrow(() -> new IllegalStateException("Role not found"));

        var user = User
                .builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .roles(List.of(userRole))
                .accountLocked(false)
                .enabled(false)
                .build();

        userRepository.save(user);
        sendValidationMail(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // Authenticate the user
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var claims = new HashMap<String, Object>();
        var user = (User) authentication.getPrincipal();
        claims.put("fullName", user.fullName());

        var jwtToken = jwtService.generateToken(claims, user);

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    public void activateAccount(String token) throws MessagingException {
        // Activate the user account
        Token activationToken = tokenRepository
                .findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token not found or Invalid"));

        if (LocalDateTime.now().isAfter(activationToken.getExpiresAt())) {
            sendValidationMail(activationToken.getUser());
            throw new RuntimeException("Activation token has expired. new token has been sent to " + activationToken.getUser().getEmail());
        }

        var user = userRepository.findById(activationToken.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEnabled(true);
        userRepository.save(user);
        activationToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(activationToken);
    }

    private void sendValidationMail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        // Send validation email
        emailService.sendEmail(
                EmailTemplateName.ACTIVATE_ACCOUNT,
                user.getEmail(),
                user.fullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT.name(),
                activationUrl,
                newToken
        );

    }

    private String generateAndSaveActivationToken(User user) {
        // Generate and save activation token
        String generatedToken = generateActivationToken(6);
        var token = Token
                .builder()
                .token(generatedToken)
                .user(user)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();

        tokenRepository.save(token);
        return generatedToken;

    }

    private String generateActivationToken(int length){
        // Generate a new activation token
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom random = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

}
