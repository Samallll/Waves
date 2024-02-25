package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.repository.EventRepository;
import com.waves.eventservice.repository.JobPostRepository;
import com.waves.eventservice.service.SharedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SharedServiceImp implements SharedService {

    private final JobPostRepository jobPostRepository;

    private final EventRepository eventRepository;

    @Override
    public Optional<Event> getEventById(Long eventId) {
        return eventRepository.findById(eventId);
    }

    @Override
    public Optional<JobPost> getJobPostByEventId(Long eventId) {

        Optional<Event> event = getEventById(eventId);
        if(event.isPresent()){
            log.debug("Job Post Details fetched for event Id:{}",eventId);
            return jobPostRepository.findByEvent(event.get());
        }
        log.debug("Failed to fetch Job Post Details");
        return Optional.empty();
    }
}
