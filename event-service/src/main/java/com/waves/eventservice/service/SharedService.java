package com.waves.eventservice.service;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;

import java.util.Optional;

public interface SharedService {
    Optional<Event> getEventById(Long eventId);
    Optional<JobPost> getJobPostByEventId(Long eventId);
}
