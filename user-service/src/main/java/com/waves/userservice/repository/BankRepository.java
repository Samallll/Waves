package com.waves.userservice.repository;

import com.waves.userservice.model.Bank;
import com.waves.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BankRepository extends JpaRepository<Bank,Long> {

    Optional<Bank> findByUser(User user);
}
