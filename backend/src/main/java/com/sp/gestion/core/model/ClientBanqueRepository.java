package com.sp.gestion.core.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientBanqueRepository extends JpaRepository<ClientBanque, Long> {

    ClientBanque findByLibelle(String libelle);
    ClientBanque findByCode(String code);
    ClientBanque findFirtByLibelle(String libelle);
}
