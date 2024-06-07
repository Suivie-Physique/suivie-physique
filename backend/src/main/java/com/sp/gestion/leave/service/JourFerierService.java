package com.sp.gestion.leave.service;

import com.sp.gestion.leave.model.JourFerierDemande;
import com.sp.gestion.leave.model.JourFerierDemandeRepository;
import com.sp.gestion.leave.model.JourFerierType;
import com.sp.gestion.leave.model.JourFerierTypeRepository;
import com.sp.gestion.leave.schema.JourFerierDemandeRequest;
import com.sp.users.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.sp.gestion.leave.schema.JourFerierData;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JourFerierService {

    private final JourFerierTypeRepository jourFerierTypeRepository;
    private final JourFerierDemandeRepository jourFerierDemandeRepository;

    public List<JourFerierData> getAllJourFerier() {

        // get all JourFerierDemande
        List<JourFerierDemande> jourFerierDemandes = jourFerierDemandeRepository.findAll();

        // Convert JourFerierDemande to JourFerierData using stream and map
        List<JourFerierData> jourFerierDataList = jourFerierDemandes.stream()
                .map(jourFerierDemande -> JourFerierData.builder()
                        .title(jourFerierDemande.getTitle())
                        .startDate(jourFerierDemande.getStartDate())
                        .endDate(jourFerierDemande.getEndDate())
                        .status(jourFerierDemande.getStatus())
                        .jourFerierTypeId(jourFerierDemande.getJourFerierType().getId())
                        .build())
                .collect(Collectors.toList());

        return jourFerierDataList;
    }


    public void addDemandeJourFerier(JourFerierDemandeRequest request, Principal connectedUser) throws IllegalStateException {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if (request.getStartDate().after(request.getEndDate())) {
            throw new IllegalStateException("Start date must be before end date");
        }

        JourFerierType jourFerierType = jourFerierTypeRepository
                .findById(request.getJourFerierTypeId())
                // better exception handling
                .orElseThrow(() -> new IllegalStateException("JourFerierType not found"));
        JourFerierDemande jourFerierDemande = JourFerierDemande
                .builder()
                .title(request.getTitle())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(request.getStatus())
                .user(user)
                .jourFerierType(jourFerierType)
                .build();

        // save the new JourFerierDemande
        jourFerierDemandeRepository.save(jourFerierDemande);
    }

    public void syncDemandeJourFerier(List<JourFerierDemandeRequest> request, Principal connectedUser) throws IllegalStateException {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        for (JourFerierDemandeRequest jourFerierDemandeRequest : request) {
            try{
            // check if jourFerierType exists
            JourFerierType jourFerierType = jourFerierTypeRepository
                    .findById(jourFerierDemandeRequest.getJourFerierTypeId())
                    .orElseThrow(() -> new IllegalStateException("JourFerierType not found"));
            // check if the event is still present in database
            JourFerierDemande jourFerierDemande = jourFerierDemandeRepository
                    .findByTitleAndJourFerierType(jourFerierDemandeRequest.getTitle(), jourFerierType)
                    .orElseThrow(() -> new IllegalStateException("JourFerierDemande not found"));

            jourFerierDemande.setStartDate(jourFerierDemandeRequest.getStartDate());
            jourFerierDemande.setEndDate(jourFerierDemandeRequest.getEndDate());

            // save the new JourFerierDemande
            jourFerierDemandeRepository.save(jourFerierDemande);
            } catch (IllegalStateException e) {
                throw new IllegalStateException(e.getMessage());
            }
        }

    }

}
