package com.sp.filter;


import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;

@Component
@WebFilter("/*")
public class StatsFilter implements Filter {
    private static final Logger LOGGER = LoggerFactory.getLogger(StatsFilter.class);

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        Instant start = Instant.now();

        try {
            filterChain.doFilter(servletRequest, servletResponse);
        } finally {
            Instant finish = Instant.now();
            long time = Duration.between(start, finish).toMillis();

            LOGGER.info("Request to {} took {} ms", ((HttpServletRequest) servletRequest).getRequestURI(), time);
        }
    }
}
