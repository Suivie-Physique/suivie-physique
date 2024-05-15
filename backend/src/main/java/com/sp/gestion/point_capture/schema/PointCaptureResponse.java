package com.sp.gestion.point_capture.schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PointCaptureResponse {
    private String libelle;
    private String secteur;
    private String type;
    private String clientBanque;
    private String lecteur;
    private String circuit;
    private boolean status;
}
