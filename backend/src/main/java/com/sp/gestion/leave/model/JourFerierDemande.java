package com.sp.gestion.leave.model;

import com.sp.users.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * This class represents the JourFerierDemande entity.
 * This entity class represents the Request for a day off entity.
 * it has a Many to One relationship with JourFerierType.
 * it has fields for start date, end date, status, created date and last modified date.
 *
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_jour_ferier_demande")
@EntityListeners(AuditingEntityListener.class)
public class JourFerierDemande implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private String title;

    private Date startDate;

    private Date endDate;

    @Formula("DATEDIFF(end_date, start_date)")
    private Long days_allocated;

    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "jour_ferier_type_id", nullable = false)
    private JourFerierType jourFerierType;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;


}
