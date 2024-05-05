package com.sp.gestion.leave.controller;


import com.sp.gestion.leave.schema.JourFerierData;
import com.sp.gestion.leave.schema.JourFerierDemandeRequest;
import com.sp.gestion.leave.schema.JourFerierDemandeResponse;
import com.sp.gestion.leave.service.JourFerierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/jour-ferier")
@RequiredArgsConstructor
public class JourFerierController {
    private final JourFerierService jourFerierService;

    @GetMapping("/all")
    public ResponseEntity<List<JourFerierData>> getAllJourFerier() {
        List<JourFerierData> jourFerierData = jourFerierService.getAllJourFerier();
        return ResponseEntity.ok(jourFerierData);
    }


    @PostMapping("/add")
    public ResponseEntity<?> addJourFerier(
            @RequestBody JourFerierDemandeRequest request,
            Principal connectedUser
    ) {
        jourFerierService.addDemandeJourFerier(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/sync")
    public ResponseEntity<?> syncJourFerier(
            @RequestBody List<JourFerierDemandeRequest> request,
            Principal connectedUser
    ) {
        jourFerierService.syncDemandeJourFerier(request, connectedUser);
        return ResponseEntity.ok().build();
    }





}
