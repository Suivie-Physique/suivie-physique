package com.sp.gestion.point_capture.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sp.gestion.core.model.ClientBanque;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_point_capture")
@EntityListeners(AuditingEntityListener.class)
public class PointCapture{
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private String libelle;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private TypePointCapture type;

    private String secteur;

    private String adresse;

    private String ville;

    private String codePostal;

    private String contact;

    private String fonctionContact;

    private String remarque;

    private boolean status;


    private String lecteur;

    // a point de capture belongs to a circuit
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "circuit_id")
    private Circuit circuit;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_banque_id")
    private ClientBanque clientBanque;

    // audit
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @LastModifiedBy
    @Column(name = "updated_by")
    private String updatedBy;

}
