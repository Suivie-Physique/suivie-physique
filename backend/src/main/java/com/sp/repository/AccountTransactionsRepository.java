package com.sp.repository;

import com.sp.model.AccountTransactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountTransactionsRepository extends JpaRepository<AccountTransactions, Long> {
    List<AccountTransactions> findByAgentIdOrderByTransactionDtDesc(int agentId);
}
