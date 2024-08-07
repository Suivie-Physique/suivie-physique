package com.sp.filter;

//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.web.csrf.CsrfToken;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//public class CsrfCookieFilter extends OncePerRequestFilter {
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
//        if(csrfToken.getHeaderName() != null){
//            response.setHeader(csrfToken.getHeaderName(), csrfToken.getToken());
//        }
//        filterChain.doFilter(request, response);
//    }
//}




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


import java.io.IOException;

@Component
public class CsrfTokenFilter extends OncePerRequestFilter {

    @Autowired
    private CsrfTokenRepository csrfTokenRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            CsrfToken csrfToken = csrfTokenRepository.loadToken(request);
            boolean csrfTokenValid = StringUtils.hasText(request.getHeader(csrfToken.getHeaderName())) &&
                    csrfToken.getToken().equals(request.getHeader(csrfToken.getHeaderName()));

            if (csrfToken == null || !csrfTokenValid) {
                // Generate a new CSRF token
                csrfToken = csrfTokenRepository.generateToken(request);
                csrfTokenRepository.saveToken(csrfToken, request, response);

                // Add the CSRF token to the response headers or cookies
                response.setHeader(csrfToken.getHeaderName(), csrfToken.getToken());
                Cookie cookie = new Cookie("XSRF-TOKEN", csrfToken.getToken());
                cookie.setPath("/");
                response.addCookie(cookie);
            }
        } catch (Exception e) {
            System.out.println("Error occurred while handling CSRF token, " + e.getMessage());
            // Log the exception and continue with the filter chain
            // logger.error("Error occurred while handling CSRF token", e);
        }
        filterChain.doFilter(request, response);
    }
}

