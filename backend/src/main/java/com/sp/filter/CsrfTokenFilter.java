package com.sp.filter;





import org.springframework.stereotype.Component;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class CsrfTokenFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        filterChain.doFilter(request, response);
    }

//    private CsrfTokenRepository csrfTokenRepository = new HttpSessionCsrfTokenRepository();
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//
//        CsrfToken csrfToken = csrfTokenRepository.loadToken(request);
//        boolean csrfTokenValid = StringUtils.hasText(request.getHeader(csrfToken.getHeaderName())) &&
//                csrfToken.getToken().equals(request.getHeader(csrfToken.getHeaderName()));
//
//        if (csrfToken == null || !csrfTokenValid) {
//            // Generate a new CSRF token
//            csrfToken = csrfTokenRepository.generateToken(request);
//            csrfTokenRepository.saveToken(csrfToken, request, response);
//
//            // Add the CSRF token to the response headers or cookies
//            response.setHeader(csrfToken.getHeaderName(), csrfToken.getToken());
//            Cookie cookie = new Cookie("XSRF-TOKEN", csrfToken.getToken());
//            cookie.setPath("/");
//            response.addCookie(cookie);
//        }
//
//        filterChain.doFilter(request, response);
//    }
}
