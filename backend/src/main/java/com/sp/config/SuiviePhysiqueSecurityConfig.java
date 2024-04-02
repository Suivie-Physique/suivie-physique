package com.sp.config;

import com.sp.filter.CsrfCookieFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class SuiviePhysiqueSecurityConfig {

    //! CORS Configuration
    List<String> allowedOrigins = List.of("http://localhost:4400");
    List<String> allowedMethods = List.of("GET", "POST", "PUT", "DELETE");

    List<String> allowedHeaders = List.of("*");
    Long maxAge = 3600L;
    Boolean allowCredentials = true;

    // Paths Security Configuration
    String[] ignoredPaths = {"/contact", "/register"};

    String[] authenticatedPaths = {"/myAccount", "/myBalance", "/myLoans", "/myCards", "/user"};

    String[] permittedPaths = {"/notices", "/contact", "/register"};



    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName("_csrf");


        return http
                .securityContext((context) -> context.requireExplicitSave(false))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration corsConfiguration = new CorsConfiguration();
                        corsConfiguration.setAllowedOrigins(allowedOrigins);
                        corsConfiguration.setAllowedMethods(allowedMethods);
                        corsConfiguration.setAllowCredentials(allowCredentials);
                        corsConfiguration.setAllowedHeaders(allowedHeaders);
                        corsConfiguration.setMaxAge(maxAge);
                        return corsConfiguration;
                    }
                }))
                .csrf((csrf) -> csrf
                        .csrfTokenRequestHandler(requestHandler)
                        .ignoringRequestMatchers(ignoredPaths)
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
                        .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)

                .authorizeRequests(requests ->
                        requests
                                .requestMatchers(authenticatedPaths).authenticated()
                                .requestMatchers(permittedPaths).permitAll()
                )
                .formLogin(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults())
                .build();
    }

    // Leveraging a BCryptPasswordEncoder for password encoding
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
