package com.waves.eventservice.repository;

import com.waves.eventservice.model.JobRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRequestRepository extends JpaRepository<JobRequest,Long> {
}
