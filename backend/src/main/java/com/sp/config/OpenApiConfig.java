package com.sp.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

import static java.awt.SystemColor.info;

@OpenAPIDefinition(
        info = @Info(
                title = "Suivie Physique API",
                version = "1.0",
                description = "API for Suivie Physique Application",
                contact = @Contact(
                        name = "Larbi Dotcipher",
                        email = "dotcipher@ncrm.com",
                        url = ""
                ),
                termsOfService = "Terms of service"
        ),
        servers = {
                @Server(
                description = "Local server",
                url = "http://localhost:3008"
                ),
                @Server(
                        description = "Production server",
                        url = "https://suivie-physique.herokuapp.com"
                )
        }
        // Uncomment the following line to add security to the whole API
//        , security = {
//               @SecurityRequirement(
//                          name = "bearerAuth"
//               )
//        }

)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT Token",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER

)
public class OpenApiConfig {

}
