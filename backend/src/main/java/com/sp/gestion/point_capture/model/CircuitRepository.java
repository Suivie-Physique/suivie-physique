package com.sp.gestion.point_capture.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CircuitRepository extends JpaRepository<Circuit, Long> {
    Circuit findByLibelle(String libelle);
    Circuit findByCode(String code);
}
