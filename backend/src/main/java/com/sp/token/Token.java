package com.sp.token;

import com.sp.users.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_token")
public class Token {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String token;

    @Enumerated(EnumType.STRING)
    private TokenType tokenType;

    @Column(nullable = true)
    private boolean expired;

    @Column(nullable = true)
    private boolean revoked;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = true)
    private LocalDateTime expiresAt;

    @Column(nullable = true)
    private LocalDateTime validatedAt;
}
