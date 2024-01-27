package com.waves.hostservice.repository;

import com.waves.hostservice.model.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HostRepository extends JpaRepository<Host,Long> {
    Optional<Host> findByEmailId(String emailId);
}
