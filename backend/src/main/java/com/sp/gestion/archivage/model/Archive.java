package com.sp.gestion.archivage.model;


import com.sp.gestion.suivie_physique.model.Valeur;
import com.sp.users.model.User;
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
@Table(name = "_archive")
@EntityListeners(AuditingEntityListener.class)
public class Archive {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private LocalDateTime dateArchive;

    @OneToMany(mappedBy = "archive", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Valeur> valeurs;


    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private ArchiveType type;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private User archivist;

    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy;

    @CreatedDate
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate;

    @LastModifiedBy
    @Column(name = "last_modified_by")
    private String lastModifiedBy;
}
