package com.sp.gestion.point_capture.schema;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PointCaptureStatsResponse {

    private int totalPointsCapture;
    private int totalCircuit;
    private int totalTypePointCapture;
    private int totalLecteur;
}
