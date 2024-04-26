package com.sp.auth.token;

import com.sp.users.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

/**
 * This Token Doesn't represent JWT Token, it represents the token that is sent to the user's email for verification.
 * This token is stored in the database.
 * Keep in mind that this token has an expiration time.
 * This token is associated with a user.
 * example of a token: 123456
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Token {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private String token;

    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private LocalDateTime validatedAt;

    // This token is associated with a user
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;
}
