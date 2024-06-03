package com.sp.gestion.core.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sp.gestion.point_capture.model.PointCapture;
import com.sp.gestion.suivie_physique.model.CompteTiret;
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

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_client_banque")
@EntityListeners(AuditingEntityListener.class)
public class ClientBanque {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private String libelle;

    private String code;

    private String description;

    private String adresse;

    private String telephone;

    private String email;

    private String siteWeb;

    private String logo;

    @OneToMany(mappedBy = "clientBanque", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PointCapture> pointsDeCapture;

    @ManyToOne
    @JoinColumn(name = "compte_tiret_id", nullable = false)
    private CompteTiret compteTiret;

    // audit
    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @CreatedBy
    @Column(name = "created_by", nullable = false, updatable = false)
    private String createdBy;

    @LastModifiedDate
    @Column(name = "last_modified_date", insertable = false)
    private LocalDateTime lastModifiedDate;

    @LastModifiedBy
    @Column(name = "last_modified_by", insertable = false)
    private String lastModifiedBy;

    public String getClientBanque(){
        return this.getCode() + " - " + this.getLibelle();
    }
}
