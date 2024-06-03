package com.sp.gestion.point_capture.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_lecteur")
public class Lecteur {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private String libelle;

    // chaque lecteur correspond à un et un seul Point de capture, et un point de capture correspond à un et un seul Lecteur
    @OneToOne(mappedBy = "lecteur")
    private PointCapture pointCapture;

}
