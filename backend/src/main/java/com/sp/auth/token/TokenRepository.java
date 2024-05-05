package com.sp.auth.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    // find all valid tokens for a user
    @Query("SELECT t FROM Token t inner join User u on t.user.id = u.id WHERE u.id = :userId and (t.expired = false or t.revoked = false)")
    List<Token> findAllValidTokensByUserId(Long userId);

    // find a token by token string
    Optional<Token> findByToken(String token);


}
