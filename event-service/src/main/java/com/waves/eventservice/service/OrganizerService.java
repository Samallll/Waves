package com.waves.eventservice.service;

import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.JobRequest;
import com.waves.eventservice.model.Organizer;

import java.util.Optional;

public interface OrganizerService {

    Optional<Organizer> getOrganizerById(Long organizerId);

    Optional<Organizer> getOrganizersByJobPost(JobPost jobPost);

    Optional<Organizer> getOrganizersByJobRequest(JobRequest jobRequest);

    Optional<Organizer> getOrganizerByUserId(Long userId);

    Organizer registerOrganizer(Long userId, JobPost jobPost,JobRequest jobRequest);

    Organizer updateOrganizer(Organizer organizer);

}
