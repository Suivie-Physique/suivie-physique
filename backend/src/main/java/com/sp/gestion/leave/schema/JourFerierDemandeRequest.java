package com.sp.gestion.leave.schema;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
public class JourFerierDemandeRequest {
    private String title;
    private Date startDate;
    private Date endDate;
    private Long jourFerierTypeId;
    private String status;
}
