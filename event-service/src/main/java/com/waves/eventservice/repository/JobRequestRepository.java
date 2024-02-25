package com.waves.eventservice.repository;

import com.waves.eventservice.model.Enum.JobRequestStatus;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.JobRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRequestRepository extends JpaRepository<JobRequest,Long> {

    List<JobRequest> findAllByUserId(Long userId);

    List<JobRequest> findAllByJobRequestStatus(JobRequestStatus status);

    Optional<JobRequest> findByJobPost(JobPost jobPost);

    Page<JobRequest> findAll(Specification<JobRequest> spec, Pageable pageable);

}
