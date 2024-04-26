package com.sp;

import com.sp.users.role.Role;
import com.sp.users.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableWebSecurity(debug = true)
public class SuiviePhysiqueBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(SuiviePhysiqueBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByName("USER").isEmpty()) {
                roleRepository.save(Role.builder().name("USER").build());
            }
            if (roleRepository.findByName("ADMIN").isEmpty()) {
                roleRepository.save(Role.builder().name("ADMIN").build());
            }
            if (roleRepository.findByName("EXPLOITANT").isEmpty()) {
                roleRepository.save(Role.builder().name("EXPLOITANT").build());
            }
            if (roleRepository.findByName("TRAIT_CHEQUE").isEmpty()) {
                roleRepository.save(Role.builder().name("TRAIT_CHEQUE").build());
            }
            if (roleRepository.findByName("TRAIT_EFFET").isEmpty()) {
                roleRepository.save(Role.builder().name("TRAIT_EFFET").build());
            }

        };
    }
}
