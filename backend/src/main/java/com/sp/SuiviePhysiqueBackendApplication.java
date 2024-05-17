package com.sp;

import com.sp.gestion.core.model.ClientBanque;
import com.sp.gestion.core.model.ClientBanqueRepository;
import com.sp.gestion.leave.model.JourFerierType;
import com.sp.gestion.leave.model.JourFerierTypeRepository;
import com.sp.gestion.point_capture.model.Circuit;
import com.sp.gestion.point_capture.model.CircuitRepository;
import com.sp.gestion.point_capture.model.TypePointCapture;
import com.sp.gestion.point_capture.model.TypePointCaptureRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import java.time.LocalDateTime;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "applicationAuditAware")
@EnableAsync
@EnableWebSecurity(debug = true)
public class SuiviePhysiqueBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(SuiviePhysiqueBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(JourFerierTypeRepository jourFerierTypeRepository, ClientBanqueRepository clientBanqueRepository, TypePointCaptureRepository typePointCaptureRepository, CircuitRepository circuitRepository) {
        return args -> {

            // Insertion des données des types des jours fériés
            if (jourFerierTypeRepository.findAll().isEmpty()) {
                jourFerierTypeRepository.save(JourFerierType.builder().type("Jour Férié laïc").description("Un jour férié laïc est un jour de congé officiel qui n’est pas basé sur une fête religieuse. Ces jours sont généralement dédiés à la célébration d’événements historiques ou de valeurs nationales.").build());
                jourFerierTypeRepository.save(JourFerierType.builder().type("Islam, Soufi").description("Un jour férié Islam, Soufi est un jour de congé officiel qui est basé sur une fête religieuse. Ces jours sont observés avec une emphase particulière sur la méditation, la prière et la communion spirituelle.").build());
                jourFerierTypeRepository.save(JourFerierType.builder().type("Evénements, fêtes").description("Les jours fériés sont des dates spécifiques de l’année qui sont reconnues et célébrées pour diverses raisons. Ils peuvent être liés à des événements historiques, des célébrations ou des commémorations civiles.").build());
                jourFerierTypeRepository.save(JourFerierType.builder().type("Evénements exceptionnels").description("Les jours fériés exceptionnels sont généralement décrétés par le gouvernement pour marquer des événements spéciaux ou des célébrations uniques. Ces jours fériés ne sont pas récurrents chaque année comme les jours fériés traditionnels.").build());
            }

            if (typePointCaptureRepository.findAll().isEmpty()) {
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Agence bancaire").code("AG").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Grand Remettant").code("GR").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Distributeur automatique de billets").code("DAB").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire").code("GAB").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Enveloppe").code("GABE").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Non Enveloppe").code("GABNE").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Mixte").code("GABM").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Polyvalent").code("GABP").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Polyvalent").code("GABP").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Recharge").code("GABR").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Ticket").code("GABT").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Virement").code("GABV").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Echange").code("GABX").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Echange").code("GABX").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Zonal").code("GABZ").build());
                typePointCaptureRepository.save(TypePointCapture.builder().libelle("Guichet Automatique Bancaire Fonctionnaire").code("GABF").build());
            }




    };
    }
}
