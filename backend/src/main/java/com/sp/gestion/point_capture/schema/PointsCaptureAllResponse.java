package com.sp.gestion.point_capture.schema;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PointsCaptureAllResponse {
    private List<PointCaptureResponse> pointsCapture;
}
