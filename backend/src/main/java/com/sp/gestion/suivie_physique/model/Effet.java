package com.sp.gestion.suivie_physique.model;


import com.sp.gestion.point_capture.model.Lecteur;
import com.sp.gestion.point_capture.model.PointCapture;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_effet")
public class Effet {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private String numeroEffet;

    private Date dateTraitement;

    private Date dateReception;

    private Date dateEcheance;

    private String montant;

    // Un Compte tirer peut avoir un ou plusieur cheque
    @ManyToOne
    @JoinColumn(name = "compte_tiret_id", nullable = false)
    private CompteTiret compteTiret;

    @ManyToOne
    @JoinColumn(name = "remise_id", nullable = false)
    private Remise remise_effet;

    // un cheque correspond a un seul lecteur, mais un lecteur peut avoir plusieurs cheque
    @ManyToOne
    @JoinColumn(name = "lecteur_id", nullable = false)
    private Lecteur lecteur;

    // un cheque correpond à un seul point de capture mais un point de capture peut avoir plusieurs cheque
    @ManyToOne
    @JoinColumn(name = "point_capture_id", nullable = false)
    private PointCapture pointCapture;

    private EtatEffet etatEffet;

    @CreatedBy
    @Column(name = "created_by", nullable = false, updatable = false)
    private String createdBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "updated_by")
    private String updatedBy;
}