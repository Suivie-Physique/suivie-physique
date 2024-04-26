package com.sp.filter.auth;

import com.sp.auth.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Service
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtService jwtService;
    private UserDetailsService userDetailsService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        System.out.println("Request path: " + request.getServletPath());
        return request.getServletPath().equals("/auth/register") ||
                request.getServletPath().equals("/auth/authenticate") ||
                request.getServletPath().equals("/auth/activate-account") ||
                request.getServletPath().equals("/auth/resend-activation-email");
    }

    @Override
    protected void doFilterInternal(
           @NonNull HttpServletRequest request,
           @NonNull HttpServletResponse response,
           @NonNull FilterChain filterChain)
    throws ServletException, IOException {


        final String authorizationHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String username;

        if (authorizationHeader == null || authorizationHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
        //  return;
            throw  new ServletException("Authorization header is missing or invalid");
        }
            jwtToken = authorizationHeader.substring(7);
            username = jwtService.extractUsername(jwtToken);


            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (jwtService.isTokenValid(jwtToken, userDetails)) {
                    final UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken
                            .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(usernamePasswordAuthenticationToken);
                }
            }

        filterChain.doFilter(request, response);
    }
}
