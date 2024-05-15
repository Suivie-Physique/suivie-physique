package com.sp.auth.service;

import com.sp.auth.schema.AuthenticationRequest;
import com.sp.auth.schema.AuthenticationResponse;
import com.sp.auth.schema.RegisterRequest;
import com.sp.auth.schema.ResetPasswordRequest;
import com.sp.auth.token.*;
import com.sp.users.role.Role;
import com.sp.users.user.UserRepository;
import com.sp.mail.config.EmailTemplateName;
import com.sp.mail.service.MailService;
import com.sp.users.user.User;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    // Repositories
//    private final RoleRepository roleRepository;
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

        var user = User
                .builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(Role.ADMIN)
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
        // Revoke all user tokens
        revokeAllUserTokens(user);

        // Generate a new valid token
        var jwtToken = jwtService.generateToken(claims, user);
        var token = Token.builder()
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .createdAt(LocalDateTime.now())
                .validatedAt(LocalDateTime.now())
                .user(user)
                .build();

        tokenRepository.save(token);

        // Return the token
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    public void activateAccount(String token) throws MessagingException {
        // Activate the user account
        Token activationTwoFactorToken = tokenRepository
                .findByToken(token)
                .orElseThrow(() -> new RuntimeException("TwoFactorToken not found or Invalid"));

        if (LocalDateTime.now().isAfter(activationTwoFactorToken.getExpiresAt())) {
            sendValidationMail(activationTwoFactorToken.getUser());
            throw new RuntimeException("Activation token has expired. new token has been sent to " + activationTwoFactorToken.getUser().getEmail());
        }

        var user = userRepository.findById(activationTwoFactorToken.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEnabled(true);
        userRepository.save(user);
        activationTwoFactorToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(activationTwoFactorToken);
    }



    public void resetPassword(ResetPasswordRequest request) throws MessagingException {
      // Reset Password
      Token forgotPasswordToken = tokenRepository
              .findByToken(request.getToken())
              .orElseThrow(() -> new RuntimeException("ForgotPasswordToken not found or Invalid"));

      if (LocalDateTime.now().isAfter(forgotPasswordToken.getExpiresAt())) {
          sendForgotPasswordMail(request.getEmail());
          throw new RuntimeException("Forgot password token has expired. new token has been sent to " + request.getEmail());
      }

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        forgotPasswordToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(forgotPasswordToken);

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetPassword(true);
        userRepository.save(user);
    }

    private void revokeAllUserTokens(User user){
        var validUserTokens = tokenRepository.findAllValidTokensByUserId(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void resendActivationMail(String email) throws MessagingException {
        // Resend activation email
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        sendValidationMail(user);
    }

    public void sendForgotPasswordMail(String email) throws MessagingException {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        var newToken = generateAndSaveForgotPasswordToken(user.getEmail());
        // Send forgot password email
        emailService.sendEmail(
                EmailTemplateName.FORGOT_PASSWORD,
                user.getEmail(),
                user.fullName(),
                EmailTemplateName.FORGOT_PASSWORD.name(),
                activationUrl,
                newToken
        );
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
                .tokenType(TokenType.TWO_FACTOR)
                .user(user)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();

        tokenRepository.save(token);
        return generatedToken;
    }

    public String generateAndSaveForgotPasswordToken(String email){
        // Send forgot password token
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String generatedToken = generateActivationToken(6);
        var token = Token
                .builder()
                .token(generatedToken)
                .tokenType(TokenType.FORGOT_PASSWORD)
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
