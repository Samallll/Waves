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
import com.waves.eventservice.util.EventMapper;
import com.waves.eventservice.util.EventSpecifications;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
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
        eventDetails.getEvent().setParticipantsCount(0L);
        Event event = eventRepository.save(eventDetails.getEvent());
        Location location = locationService.registerLocation(eventDetails.getLocation());
        location.setEvent(event);
        locationService.registerLocation(location);
        if(eventDetails.getJobPost()!=null){
            JobPost jobPost = jobPostService.createJobPost(eventDetails.getJobPost());
            jobPost.setEvent(event);
            jobPost = jobPostService.createJobPost(jobPost);
            event.setJobPost(jobPost);
        }
        event.setLocation(location);
        log.debug("Event has been created");
        return eventRepository.save(event);
    }

    @Override
    public Optional<EventDetails> updateEvent(EventDetails eventDetails) {

        Optional<Event> existingEvent = eventRepository.findById(eventDetails.getEvent().getEventId());
        if(existingEvent.isPresent()){
            Event updatedEvent = existingEvent.get();

            updatedEvent.setEventId(eventDetails.getEvent().getEventId());
            updatedEvent.setEventName(eventDetails.getEvent().getEventName());
            updatedEvent.setContentType(eventDetails.getEvent().getContentType());
            updatedEvent.setEventDate(eventDetails.getEvent().getEventDate());
            updatedEvent.setEventTime(eventDetails.getEvent().getEventTime());
            updatedEvent.setDescription(eventDetails.getEvent().getDescription());
            updatedEvent.setEventMode(eventDetails.getEvent().getEventMode());
            updatedEvent.setEventStatus(eventDetails.getEvent().getEventStatus());
            updatedEvent.setGenre(eventDetails.getEvent().getGenre());
            updatedEvent.setHostedByUserId(eventDetails.getUserId()); // Assuming the userId is the host
            updatedEvent.setProfit(eventDetails.getEvent().getProfit());
            updatedEvent.setParticipantsCount(eventDetails.getEvent().getParticipantsCount());
            updatedEvent.setSeatsAvailable(eventDetails.getEvent().getSeatsAvailable());
            updatedEvent.setOrganizerCount(eventDetails.getEvent().getOrganizerCount());
            updatedEvent.setTermsAndConditions(eventDetails.getEvent().getTermsAndConditions());
            updatedEvent.setTicketPrice(eventDetails.getEvent().getTicketPrice());
            updatedEvent.setEventPictureId(eventDetails.getEvent().getEventPictureId());

            if(eventDetails.getJobPost()!=null){
                new JobPost();
                JobPost editedJobPost;
                if(eventDetails.getJobPost().getJobPostId()==null){
                    editedJobPost = jobPostService.createJobPost(eventDetails.getJobPost());
                }
                else{
                    editedJobPost = jobPostService.updateJobPost(eventDetails.getJobPost().getJobPostId(),eventDetails.getJobPost());
                }
                updatedEvent.setJobPost(editedJobPost);
            }
            if(eventDetails.getLocation()!=null){
                Location editedLocation = locationService.updateLocation(eventDetails.getLocation().getLocationId(),eventDetails.getLocation());
                updatedEvent.setLocation(editedLocation);
            }

            EventDetails eventDetails1 = EventMapper.eventToEventDetails(eventRepository.save(updatedEvent));
            log.debug("Event Details updated successfully");
            return Optional.of(eventDetails1);
        }
        log.debug("Failed to update event details");
        return Optional.empty();
    }

    @Override
    public boolean registerUserForParticipation(Long userId, Long eventId) {
        return false;
    }

    @Override
    public Optional<EventDetails> getEventById(Long eventId) {

        Optional<Event> event = eventRepository.findById(eventId);
        EventDetails eventDetails = null;
        if(event.isPresent()) {
            eventDetails = EventMapper.eventToEventDetails(event.get());
        }
        return Optional.ofNullable(eventDetails);
    }

    @Override
    public List<Event> getEventsByHost(Long hostId) {
        return null;
    }

    @Override
    public Page<Event> getEventsByGenre(String genre,Pageable pageable) {
        Specification<Event> spec = Specification.where(null);
        if (!StringUtils.isEmpty(genre)) {
            spec = spec.and(EventSpecifications.genre(genre));
        }
        spec.and(EventSpecifications.eventStatus(EventStatus.LIVE));
        return eventRepository.findAll(spec,pageable);
    }

    @Override
    public List<Event> getEventsByEventMode(EventMode eventMode) {
        return null;
    }

    @Override
    public Page<Event> getEventsByEventStatus(EventStatus eventStatus,Pageable pageable) {

        Specification<Event> spec = Specification.where(null);
        spec.and(EventSpecifications.eventStatus(eventStatus));
        return eventRepository.findAll(spec,pageable);
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
    public Page<Event> getEvents(String searchQuery,List<String> genre,List<String> contentType,List<String> eventMode,List<String> eventStatus,String removeEventStatus,Pageable pageable) {

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

        Page<Event> eventDetails = eventRepository.findAll(spec, pageable);

        if(!StringUtils.isEmpty(removeEventStatus)){
            EventStatus status = EventStatus.valueOf(removeEventStatus.toUpperCase());
            List<Event> events = eventDetails.getContent().stream()
                    .filter(event -> !event.getEventStatus().equals(status))
                    .toList();

            eventDetails = new PageImpl<>(events, pageable, events.size());
        }

        log.debug("Event Details fetched from repository");
        return eventDetails;
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

    /**
     * Runs every 15 minutes to expiry events which are crossed scheduled date and time.
     */
    @Override
    @Transactional
    @Scheduled(fixedRate = 900000)
    public void updateExpiredEventsStatus() {

        List<Event> expiredEvents = eventRepository.findByEventDateAndEventTimeBeforeAndEventStatusNot(
                LocalDate.now(), LocalTime.now(),EventStatus.EXPIRED
        );
        List<Event> organizingEvents = eventRepository.findByEventStatus(EventStatus.ORGANIZING);
        expiredEvents.removeAll(organizingEvents);
        expiredEvents.forEach(event -> {
            event.setEventStatus(EventStatus.EXPIRED);
            eventRepository.save(event);
        });
    }

    @Override
    public boolean updateEventStatus(Long eventId,EventStatus eventStatus) {

        Optional<Event> event = eventRepository.findById(eventId);
        if(event.isPresent()){
            event.get().setEventStatus(eventStatus);
            if(event.get().getJobPost()!=null && eventStatus.equals(EventStatus.EXPIRED)){
                Optional<JobPost> jobPost = jobPostService.getByPostId(event.get().getJobPost().getJobPostId());
                if(jobPost.isPresent()){
                    jobPost.get().setActive(false);
                    jobPostService.createJobPost(jobPost.get());
                }
            }
            eventRepository.save(event.get());
            log.debug("Event Status updated successfully for eventId: {}", eventId);
            return true;
        }
        log.debug("Event Status modification failed for eventId: {}",eventId);
        return false;
    }

    @Override
    public Page<Event> getEventsByEventStatusAndSearch(EventStatus eventStatus, Pageable pageable, String searchQuery) {

        Specification<Event> spec = Specification.where(null);
        if(!StringUtils.isEmpty(searchQuery)){
            spec = spec.and(EventSpecifications.search(searchQuery));
        }
        if(eventStatus!=null){
            spec = spec.and(EventSpecifications.eventStatus(eventStatus));
        }
        return eventRepository.findAll(spec,pageable);
    }
}
