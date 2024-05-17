package com.sp.gestion.leave.schema;

import com.sp.gestion.leave.model.JourFerierDemande;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class JourFerierDemandeResponse {
    private List<JourFerierData> jourFeriers;
}
