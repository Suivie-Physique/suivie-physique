package com.sp.gestion.suivie_physique.model;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum EtatEffet {

    Conserver("à Conserver"),
    Echue("Echue"),
    Valider("Valide");

    @Getter
    private final String etat;
}
