package com.waves.hostservice.repository;

import com.waves.hostservice.model.HostRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HostRequestRepository extends JpaRepository<HostRequest,Long> {

    Optional<HostRequest> findByUserId(Long userId);
}
