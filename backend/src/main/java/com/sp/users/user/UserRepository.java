package com.sp.users.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.id != :id")
    List<User> findUsersNotWithId(@Param("id") Long id);

    // add a query that finds the total of users in db
    @Query("SELECT count(u) FROM User u")
    Long findUsersCount();

    // add a query the finds the total of users having account_locked = false
    @Query("SELECT count(u) FROM User u WHERE u.accountLocked = false")
    Long findUsersNotLockedCount();

    // add a query that finds total of unique roles in db
    @Query("SELECT count(distinct u.role) FROM User u")
    Long findUniqueRolesCount();

    // add a query that finds the total of users having a token that is not revoked, not expired and has token type = BEARER
    @Query("SELECT count(distinct u) FROM User u LEFT JOIN Token t ON u.id = t.user.id WHERE t.revoked = false AND t.expired = false AND t.tokenType = 'BEARER'")
    Long findUsersWithBearerTokenCount();

}
