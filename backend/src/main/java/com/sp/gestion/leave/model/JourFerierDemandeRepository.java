package com.sp.gestion.leave.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JourFerierDemandeRepository extends JpaRepository<JourFerierDemande, Long> {
    Optional<JourFerierDemande> findByTitleAndJourFerierType(String title, JourFerierType jourFerierType);
}
