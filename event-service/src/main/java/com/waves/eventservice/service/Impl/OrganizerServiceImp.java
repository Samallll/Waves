package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.JobRequest;
import com.waves.eventservice.model.Organizer;
import com.waves.eventservice.repository.OrganizerRepository;
import com.waves.eventservice.service.OrganizerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrganizerServiceImp implements OrganizerService {

    private final OrganizerRepository organizerRepository;

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
    public Organizer createOrganizer(Organizer organizer) {
        return organizerRepository.save(organizer);
    }

    @Override
    public Organizer updateOrganizer(Organizer organizer) {
        return null;
    }
}
