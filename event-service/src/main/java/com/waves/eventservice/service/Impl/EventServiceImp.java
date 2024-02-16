package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.Dto.EventDetails;
import com.waves.eventservice.model.Enum.ContentType;
import com.waves.eventservice.model.Enum.EventMode;
import com.waves.eventservice.model.Enum.EventStatus;
import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.Location;
import com.waves.eventservice.repository.EventRepository;
import com.waves.eventservice.service.EventService;
import com.waves.eventservice.service.JobPostService;
import com.waves.eventservice.service.LocationService;
import com.waves.eventservice.service.S3Service;
import com.waves.eventservice.util.EventSpecifications;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class EventServiceImp implements EventService {

    private final JobPostService jobPostService;

    private final LocationService locationService;

    private final EventRepository eventRepository;

    private final S3Service s3Service;

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    @Transactional
    public Event registerEvent(EventDetails eventDetails) {

        eventDetails.getEvent().setEventStatus(EventStatus.ORGANIZING);
        eventDetails.getEvent().setHostedByUserId(eventDetails.getUserId());
        Event event = eventRepository.save(eventDetails.getEvent());
        Location location = locationService.registerLocation(eventDetails.getLocation());
        location.setEvent(event);
        locationService.registerLocation(location);
        if(eventDetails.getJobPost()!=null){
            JobPost jobPost = jobPostService.createJobPost(eventDetails.getJobPost());
            jobPost.setEvent(event);
            jobPostService.createJobPost(jobPost);
            event.setJobPost(jobPost);
        }
        event.setLocation(location);
        log.debug("Event has been created");
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(Event event) {
        return null;
    }

    @Override
    public boolean registerUserForParticipation(Long userId, Long eventId) {
        return false;
    }

    @Override
    public Optional<Event> getEventById(Long eventId) {
        return Optional.empty();
    }

    @Override
    public List<Event> getEventsByHost(Long hostId) {
        return null;
    }

    @Override
    public List<Event> getEventsByGenre(String genre) {
        return null;
    }

    @Override
    public List<Event> getEventsByEventMode(EventMode eventMode) {
        return null;
    }

    @Override
    public List<Event> getEventsByEventStatus(EventStatus eventStatus) {
        return null;
    }

    @Override
    public List<Event> getEventsByContentType(ContentType contentType) {
        return null;
    }

    @Override
    public Optional<Event> getByJobPost(JobPost jobPost) {
        return Optional.empty();
    }

    @Override
    public Page<Event> getEvents(String searchQuery,List<String> genre,List<String> contentType,List<String> eventMode,List<String> eventStatus,Pageable pageable) {

        List<ContentType> contentTypes = contentType.stream()
                .map(type -> ContentType.valueOf(type.toUpperCase()))
                .toList();

        List<EventMode> eventModes = eventMode.stream()
                .map(mode -> EventMode.valueOf(mode.toUpperCase()))
                .toList();

        List<EventStatus> eventStatuses = eventStatus.stream()
                .map(status -> EventStatus.valueOf(status.toUpperCase()))
                .toList();

        Specification<Event> spec = Specification.where(null);
        if (!StringUtils.isEmpty(searchQuery)) {
            spec = spec.and(EventSpecifications.search(searchQuery));
        }
        if (!CollectionUtils.isEmpty(genre)) {
            spec = spec.and(EventSpecifications.genre(genre));
        }
        if (!CollectionUtils.isEmpty(contentTypes)) {
            spec = spec.and(EventSpecifications.contentType(contentTypes));
        }
        if (!CollectionUtils.isEmpty(eventModes)) {
            spec = spec.and(EventSpecifications.eventMode(eventModes));
        }
        if (!CollectionUtils.isEmpty(eventStatuses)) {
            spec = spec.and(EventSpecifications.eventStatus(eventStatuses));
        }

        log.debug("Event Details fetched from repository");
        return eventRepository.findAll(spec, pageable);
    }

    @Override
    public String uploadImage(MultipartFile file) {
        try {
            return s3Service.putObject(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public byte[] viewImage(String key) {
        return s3Service.getObject(key);
    }
}
