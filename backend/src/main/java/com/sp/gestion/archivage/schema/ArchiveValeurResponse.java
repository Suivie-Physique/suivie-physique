package com.sp.gestion.archivage.schema;


import com.sp.gestion.suivie_physique.model.Valeur;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ArchiveValeurResponse {
    private List<Valeur> valeurs;
}
