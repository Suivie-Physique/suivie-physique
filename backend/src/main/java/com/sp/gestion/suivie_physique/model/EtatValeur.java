package com.sp.gestion.suivie_physique.model;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum EtatValeur {
    Recue("Recue"),
    Archive("Archive"),
    Valide("Valide"),
    Conserver("à Conserver"),
    Echue("Echue");

    @Getter
    private final String etat;
}
