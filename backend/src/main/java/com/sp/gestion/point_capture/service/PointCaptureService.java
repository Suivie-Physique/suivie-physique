package com.sp.gestion.point_capture.service;


import com.sp.gestion.core.model.ClientBanqueRepository;
import com.sp.gestion.point_capture.model.*;
import com.sp.gestion.point_capture.schema.*;
import com.sp.users.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PointCaptureService {

    private final PointCaptureRepository pointCaptureRepository;
    private final ClientBanqueRepository clientBanqueRepository;
    private final TypePointCaptureRepository typePointCaptureRepository;
    private final CircuitRepository circuitRepository;
    private final LecteurRepository lecteurRepository;


    public PointsCaptureAllResponse getAllPointsCapture(){

        if (pointCaptureRepository.findAll().isEmpty()){
            return PointsCaptureAllResponse.builder().pointsCapture(null).build();
        }

        // lets transform each pointCapture to PointCaptureResponse
        var pointCaptureResponseList = pointCaptureRepository.findAll().stream().map(pointCapture -> {
            return PointCaptureResponse.builder()
                    .libelle(pointCapture.getLibelle())
                    .status(pointCapture.isStatus())
                    .type(pointCapture.getType().getLibelle())
                    .clientBanque(pointCapture.getClientBanque().getCode() + "-" + pointCapture.getClientBanque().getLibelle())
                    .lecteur(pointCapture.getLecteur().getLibelle())
                    .circuit(pointCapture.getCircuit().getLibelle())
                    .secteur(pointCapture.getSecteur())
                    .build();
        }).toList();

        PointsCaptureAllResponse pointsCaptureAllResponse = PointsCaptureAllResponse.builder()
                .pointsCapture(pointCaptureResponseList)
                .build();

        return pointsCaptureAllResponse;
    }

    public CircuitAllResponse getAllCircuits(){
        if (circuitRepository.findAll().isEmpty()) {
            return CircuitAllResponse.builder().circuits(null).build();
        }

        var circuits = circuitRepository.findAll().stream().map(circuit -> {
            return CircuitResponse.builder()
                    .libelle(circuit.getLibelle())
                    .code(circuit.getCode())
                    .description(circuit.getDescription())
                    .depart(circuit.getDepart())
                    .arrivee(circuit.getArrivee())
                    .distance(circuit.getDistance())
                    .duree(circuit.getDuree())
                    .status(circuit.isStatus())
                    .build();
        }).toList();

        return CircuitAllResponse.builder().circuits(circuits).build();
    }

    public void addPointCapture(PointCaptureRequest request, Principal connectedUser){
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if (clientBanqueRepository.findByLibelle(request.getClientBanque()) == null){
            throw new RuntimeException("Client Banque not found");
        }

        if (circuitRepository.findByLibelle(request.getCircuit()) == null){
            throw new RuntimeException("Circuit not found");
        }

        TypePointCapture typePointCapture = TypePointCapture.builder()
                .libelle(request.getType())
                .build();

        Lecteur lecteur = Lecteur.builder()
                .libelle(request.getLecteur())
                .build();

        PointCapture pointCapture = PointCapture.builder()
                .id(null)
                .libelle(request.getLibelle())
                .type(typePointCapture)
                .secteur(request.getSecteur())
                .status(request.isStatus())
                .lecteur(lecteur)
                .circuit(circuitRepository.findByLibelle(request.getCircuit()))
                .clientBanque(clientBanqueRepository.findByLibelle(request.getClientBanque()))
                .createdAt(LocalDateTime.now())
                .createdBy(user.getUsername())
                .updatedAt(LocalDateTime.now())
                .updatedBy(user.getUsername())
                .build();

        pointCaptureRepository.save(pointCapture);
    }

    public void addCircuit(CircuitRequest request, Principal connectedUser){
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        Circuit circuit = Circuit.builder()
                .id(null)
                .code(request.getCode())
                .description(request.getDescription())
                .depart(request.getDepart())
                .arrivee(request.getArrivee())
                .distance(request.getDistance())
                .duree(request.getDuree())
                .status(request.isStatus())
                .libelle(request.getLibelle())
                .createdAt(LocalDateTime.now())
                .createdBy(user.getUsername())
                .updatedAt(LocalDateTime.now())
                .updatedBy(user.getUsername())
                .build();

        circuitRepository.save(circuit);
    }

    public PointCaptureStatsResponse getPointCaptureStats(Principal connectedUser){
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        return PointCaptureStatsResponse.builder()
                .totalPointsCapture(pointCaptureRepository.findAll().size())
                .totalCircuit(circuitRepository.findAll().size())
                .totalTypePointCapture(typePointCaptureRepository.findAll().size())
                .totalLecteur(lecteurRepository.findAll().size())
                .build();
    }
}