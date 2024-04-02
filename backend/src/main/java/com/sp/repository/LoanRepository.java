package com.sp.repository;

import com.sp.model.Loans;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loans, Long> {
    List<Loans> findByAgentIdOrderByStartDtDesc(int agentId);
}
