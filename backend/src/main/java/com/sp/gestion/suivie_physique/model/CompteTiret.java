package com.sp.gestion.suivie_physique.model;


import com.sp.gestion.core.model.ClientBanque;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_compte_tiret")
public class CompteTiret {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;

    private String numeroCompteTiret;

    @OneToMany(mappedBy = "compteTiret", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ClientBanque> clientBanque;


}
