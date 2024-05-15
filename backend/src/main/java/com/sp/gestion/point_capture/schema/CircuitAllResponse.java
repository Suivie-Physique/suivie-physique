package com.sp.gestion.point_capture.schema;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CircuitAllResponse {
    private List<CircuitResponse> circuits;
}
