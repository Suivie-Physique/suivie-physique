package com.sp.users.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sp.token.Token;
import com.sp.gestion.leave.model.JourFerierDemande;
import com.sp.gestion.suivie_physique.model.Reception;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.sp.gestion.notification.model.Notification;
import com.sp.gestion.productivity.model.Productivity;

import java.io.Serializable;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;


/**
 * This class represents the User entity.
 * This class implements UserDetails and Principal.
 * This class is associated with Role.
 * This class has auditing fields.
 * This class has a Many to Many relationship with Role.
 * This class has a unique email field.
 * This class has a unique id field.
 * This class has a unique username field.
 * This class has a unique password field.
 * This class has a unique accountLocked field.
 * This class has a unique enabled field.
 * This class has a unique createdDate field.
 * This class has a unique lastModifiedDate field.
 * This class has a unique fullName method.
 * This class has a unique getName method.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_user")
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails, Principal, Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private String firstName;

    private String lastName;

    @Column(unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private boolean accountLocked;

    private boolean enabled;

    private boolean resetPassword;

    // OneToOne relationship with Reception
    @OneToOne(mappedBy = "recepteur")
    private Reception reception;

    // Many-to-Many relationship with Role
    @Enumerated(EnumType.STRING)
    private Role role;

    // Many-to-One relationship with Token
    @OneToMany(mappedBy = "user")
    private List<Token> tokens;


    // One-to-Many relationship with JourFeierDemande
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JourFerierDemande> jourFerierDemandes;

    // Notification
    @OneToMany(mappedBy = "recipient")
    private Set<Notification> receivedNotifications;

    @OneToMany(mappedBy = "sender")
    private Set<Notification> sentNotifications;


    // Productivity
    @OneToMany(mappedBy = "productivity")
    private Set<Productivity> productivities;

    // Auditing

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;


    // This represents user's Username
    @Override
    public String getName() {
        return email;
    }

    public String fullName(){
        return firstName + " " + lastName;
    }

    // This method returns the roles of the user as a list of GrantedAuthority
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
