package com.waves.eventservice.repository;

import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.JobRequest;
import com.waves.eventservice.model.Organizer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrganizerRepository extends JpaRepository<Organizer,Long> {

    List<Organizer> findAllByUserId(Long userId);

    Optional<Organizer> findByJobPost(JobPost jobPost);

    Optional<Organizer> findByJobRequest(JobRequest jobRequest);
}
