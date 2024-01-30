package com.waves.hostservice.repository;

import com.waves.hostservice.model.HostRequest;
import com.waves.hostservice.model.RequestStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HostRequestRepository extends JpaRepository<HostRequest,Long> {

    Optional<HostRequest> findByUserId(Long userId);

    Optional<HostRequest> findByUserIdAndStatus(Long userId, RequestStatus status);

    Page<HostRequest> findByEmailIdContaining(String searchQuery, Pageable pageable);
}
