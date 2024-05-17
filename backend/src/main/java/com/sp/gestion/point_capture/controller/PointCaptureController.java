package com.sp.gestion.point_capture.controller;


import com.sp.gestion.point_capture.schema.CircuitAllResponse;
import com.sp.gestion.point_capture.schema.CircuitRequest;
import com.sp.gestion.point_capture.schema.PointCaptureRequest;
import com.sp.gestion.point_capture.schema.PointsCaptureAllResponse;
import com.sp.gestion.point_capture.service.PointCaptureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/point-capture")
@RequiredArgsConstructor
public class PointCaptureController {

    private final PointCaptureService pointCaptureService;

    @GetMapping("/all")
    public ResponseEntity<PointsCaptureAllResponse> getAllPointsCapture() {
        return ResponseEntity.ok(pointCaptureService.getAllPointsCapture());
    }

    @GetMapping("/all-circuits")
    public ResponseEntity<CircuitAllResponse> getAllCircuits() {
        return ResponseEntity.ok(pointCaptureService.getAllCircuits());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPointCapture(
            @RequestBody PointCaptureRequest request,
            Principal connectedUser
            ) {
        try {
        pointCaptureService.addPointCapture(request, connectedUser);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add-circuit")
    public ResponseEntity<?> addCircuit(
            @RequestBody CircuitRequest request,
            Principal connectedUser
            ) {
        try {
        pointCaptureService.addCircuit(request, connectedUser);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().build();
    }

}
