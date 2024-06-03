package com.sp.gestion.suivie_physique.model;


import com.sp.users.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_reception")
public class Reception {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private String numeroReception;

    private Date dateReception;

    // recepteur doit etre un utilisateur
    @OneToOne
    @JoinColumn(name = "recepteur_id", nullable = false)
    private User recepteur;
}
