package com.sp.controller;

import com.sp.model.Agent;
import com.sp.repository.AgentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
public class LoginController {
    private AgentRepository agentRepository;
    private PasswordEncoder passwordEncoder;

    public LoginController(AgentRepository agentRepository, PasswordEncoder passwordEncoder) {
        this.agentRepository = agentRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/register")
    public ResponseEntity<String> registerAgent(@RequestBody Agent agent){
        Agent savedAgent = null;
        ResponseEntity response = null;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String createdDate = dateFormat.format(new Date(System.currentTimeMillis()));
        try {
            String hashPassword = passwordEncoder.encode(agent.getPwd());
            agent.setPwd(hashPassword);
            agent.setCreateDt(dateFormat.parse(createdDate));
            savedAgent = agentRepository.save(agent);
            if (savedAgent.getId() > 0){
                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body("Agent registered successfully");
            }
        } catch (Exception e) {
            response = ResponseEntity.badRequest().body("Agent registration failed due to  + e.getMessage()");
        }
        return response;
    }


    @RequestMapping("/user")
    public Agent getUserDetailsAfterLogin(Authentication authentication) {
        List<Agent> customers = agentRepository.findByEmail(authentication.getName());
        if (customers.size() > 0) {
            return customers.get(0);
        } else {
            return null;
        }

    }
}