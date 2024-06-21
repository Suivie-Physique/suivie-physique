package com.sp.gestion.suivie_physique.model;

import com.sp.gestion.point_capture.model.PointCapture;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_remise")
@EntityListeners(AuditingEntityListener.class)
public class Remise {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private String numeroRemise;

    private String montant;

    private String nombreEffet;

    private String nombreEffetRejete;

    private String nombreEffetAccepte;

    // une remise ayant un ou plusieur Cheque ou Effet
    @ManyToOne
    @JoinColumn(name = "compte_tiret_id", nullable = false)
    private CompteTiret compteTiret;

    @ManyToOne
    @JoinColumn(name = "point_capture_id", nullable = false)
    private PointCapture pointCapture;

    @OneToMany(mappedBy = "remise", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Valeur> valeurs;


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
