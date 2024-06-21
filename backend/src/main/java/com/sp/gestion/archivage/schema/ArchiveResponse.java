package com.sp.gestion.archivage.schema;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ArchiveResponse {
    private LocalDateTime dateArchive;
    private String type;
    private int totalValeurs;
    private String archivist;
}
