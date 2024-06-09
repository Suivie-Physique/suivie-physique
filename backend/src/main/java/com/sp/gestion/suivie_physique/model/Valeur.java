package com.sp.gestion.suivie_physique.model;


import com.sp.gestion.archivage.model.Archive;
import com.sp.gestion.point_capture.model.Lecteur;
import com.sp.gestion.point_capture.model.PointCapture;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_valeur")
@EntityListeners(AuditingEntityListener.class)
public class Valeur {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private String numeroValeur;

    private Date dateTraitement;

    private Date dateReception;

    private Date dateEcheance;

    private String montant;

    // un cheque peut etre un cheque ou un effet
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private ValeurType type;

    // Un Compte tirer peut avoir un ou plusieur cheque
    @ManyToOne
    @JoinColumn(name = "compte_tiret_id", nullable = false)
    private CompteTiret compteTiret;

    // un cheque correspond a un seul lecteur, mais un lecteur peut avoir plusieurs cheque
    @ManyToOne
    @JoinColumn(name = "lecteur_id", nullable = false)
    private Lecteur lecteur;

    // un cheque correpond à un seul point de capture mais un point de capture peut avoir plusieurs cheque
    @ManyToOne
    @JoinColumn(name = "point_capture_id", nullable = false)
    private PointCapture pointCapture;

    private EtatValeur etat;


    @ManyToOne
    @JoinColumn(name = "remise_id", nullable = false)
    private Remise remise;

    @ManyToOne
    @JoinColumn(name = "archive_id", nullable = false)
    private Archive archive;

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
