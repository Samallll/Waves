package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.JobRequest;
import com.waves.eventservice.model.Organizer;
import com.waves.eventservice.service.OrganizerService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrganizerServiceImp implements OrganizerService {
    @Override
    public Optional<Organizer> getOrganizerById(Long organizerId) {
        return Optional.empty();
    }

    @Override
    public Optional<Organizer> getOrganizersByJobPost(JobPost jobPost) {
        return Optional.empty();
    }

    @Override
    public Optional<Organizer> getOrganizersByJobRequest(JobRequest jobRequest) {
        return Optional.empty();
    }

    @Override
    public Optional<Organizer> getOrganizerByUserId(Long userId) {
        return Optional.empty();
    }

    @Override
    public Organizer registerOrganizer(Long userId, JobPost jobPost, JobRequest jobRequest) {
        return null;
    }

    @Override
    public Organizer updateOrganizer(Organizer organizer) {
        return null;
    }
}
