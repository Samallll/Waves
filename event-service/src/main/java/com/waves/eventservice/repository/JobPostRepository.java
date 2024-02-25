package com.waves.eventservice.repository;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost,Long> {

    Optional<JobPost> findByEvent(Event event);

    List<JobPost> findByIsActive(boolean status);

    Page<JobPost> findAll(Specification<JobPost> spec, Pageable pageable);

}
