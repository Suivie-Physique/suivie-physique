package com.sp;

import com.sp.gestion.leave.model.JourFerierType;
import com.sp.gestion.leave.model.JourFerierTypeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "applicationAuditAware")
@EnableAsync
@EnableWebSecurity(debug = true)
public class SuiviePhysiqueBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(SuiviePhysiqueBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(JourFerierTypeRepository jourFerierTypeRepository) {
        return args -> {

            // Insertion des données des types des jours fériés
            if (jourFerierTypeRepository.findAll().isEmpty()) {
                jourFerierTypeRepository.save(JourFerierType.builder().type("Jour Férié laïc").description("Un jour férié laïc est un jour de congé officiel qui n’est pas basé sur une fête religieuse. Ces jours sont généralement dédiés à la célébration d’événements historiques ou de valeurs nationales.").build());
                jourFerierTypeRepository.save(JourFerierType.builder().type("Islam, Soufi").description("Un jour férié Islam, Soufi est un jour de congé officiel qui est basé sur une fête religieuse. Ces jours sont observés avec une emphase particulière sur la méditation, la prière et la communion spirituelle.").build());
                jourFerierTypeRepository.save(JourFerierType.builder().type("Evénements, fêtes").description("Les jours fériés sont des dates spécifiques de l’année qui sont reconnues et célébrées pour diverses raisons. Ils peuvent être liés à des événements historiques, des célébrations ou des commémorations civiles.").build());
                jourFerierTypeRepository.save(JourFerierType.builder().type("Evénements exceptionnels").description("Les jours fériés exceptionnels sont généralement décrétés par le gouvernement pour marquer des événements spéciaux ou des célébrations uniques. Ces jours fériés ne sont pas récurrents chaque année comme les jours fériés traditionnels.").build());
            }

        };
    }
}
