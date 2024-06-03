package com.sp.gestion.suivie_physique.model;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum EtatCheque {
    Recue("Recue"),
    Archive("Archive"),
    Valide("Valide");

    @Getter
    private final String etat;
}
