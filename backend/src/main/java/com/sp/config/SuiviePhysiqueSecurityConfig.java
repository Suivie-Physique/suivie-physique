package com.sp.config;

import com.sp.filter.CsrfCookieFilter;
import com.sp.filter.auth.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;
//
//@Configuration
//public class SuiviePhysiqueSecurityConfig {
//
//    //! CORS Configuration
//    List<String> allowedOrigins = List.of("http://localhost:4400");
//    List<String> allowedMethods = List.of("GET", "POST", "PUT", "DELETE");
//
//    List<String> allowedHeaders = List.of("*");
//    Long maxAge = 3600L;
//    Boolean allowCredentials = true;
//
//    // Paths Security Configuration
//    String[] ignoredPaths = {"/contact", "/register"};
//
//    String[] authenticatedPaths = {"/myAccount", "/myBalance", "/myLoans", "/myCards", "/user"};
//
//    String[] permittedPaths = {"/notices", "/contact", "/register", "/login", "/logout", "/forgotPassword", "/resetPassword"};
//
//
//
//    @Bean
//    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
//        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
//        requestHandler.setCsrfRequestAttributeName("_csrf");
//
//
//        return http
//                .securityContext((context) -> context.requireExplicitSave(false))
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
//                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
//                    @Override
//                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//                        CorsConfiguration corsConfiguration = new CorsConfiguration();
//                        corsConfiguration.setAllowedOrigins(allowedOrigins);
//                        corsConfiguration.setAllowedMethods(allowedMethods);
//                        corsConfiguration.setAllowCredentials(allowCredentials);
//                        corsConfiguration.setAllowedHeaders(allowedHeaders);
//                        corsConfiguration.setMaxAge(maxAge);
//                        return corsConfiguration;
//                    }
//                }))
//                .csrf((csrf) -> csrf
//                        .csrfTokenRequestHandler(requestHandler)
//                        .ignoringRequestMatchers(ignoredPaths)
//                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
//                        .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
//
//                .authorizeRequests(requests ->
//                        requests
//                                .requestMatchers("/user").hasAnyRole("USER", "ADMIN")
//                                .requestMatchers(authenticatedPaths).authenticated()
//                                .requestMatchers(permittedPaths).permitAll()
//                )
//                .formLogin(Customizer.withDefaults())
//                .httpBasic(Customizer.withDefaults())
//                .build();
//    }
//
//    // Leveraging a BCryptPasswordEncoder for password encoding
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//    }
//}

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class SuiviePhysiqueSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final String[] PermittedRequests = {"/auth/**","/v2/api-docs","/v3/api-docs", "/v3/api-docs/**" , "/configuration/ui", "/swagger-resources/**", "/configuration/security", "/swagger-ui.html", "/webjars/**", "/swagger-ui/**"};

    @Bean
    public SecurityFilterChain securityFilterChain
            (HttpSecurity http)
            throws Exception{
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req
                                .requestMatchers(PermittedRequests).permitAll()
                                .anyRequest().authenticated()

                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
