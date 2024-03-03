package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.Dto.EventDetails;
import com.waves.eventservice.model.Dto.ParticipantDto;
import com.waves.eventservice.model.Dto.ParticipationDto;
import com.waves.eventservice.model.Enum.ContentType;
import com.waves.eventservice.model.Enum.EventMode;
import com.waves.eventservice.model.Enum.EventStatus;
import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.Location;
import com.waves.eventservice.model.Participant;
import com.waves.eventservice.producer.EmailProducer;
import com.waves.eventservice.repository.EventRepository;
import com.waves.eventservice.service.*;
import com.waves.eventservice.util.EventMapper;
import com.waves.eventservice.util.EventSpecifications;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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
import java.util.NoSuchElementException;
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

    private final ParticipantService participantService;

    private final EmailProducer emailProducer;


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
            jobPost.setPostedByUserId(eventDetails.getEvent().getHostedByUserId());
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
            Event updatedEvent = updateEventData(existingEvent.get(), eventDetails);
            updateJobPost(eventDetails.getJobPost());
            updateLocation(eventDetails.getLocation());
            EventDetails eventDetails1 = EventMapper.eventToEventDetails(updatedEvent);
            log.debug("Event Details updated successfully");
            return Optional.of(eventDetails1);
        }
        log.debug("Failed to update event details");
        return Optional.empty();
    }

    private Event updateEventData(Event existingEvent, EventDetails eventDetails) {
        existingEvent.setEventId(eventDetails.getEvent().getEventId());
        existingEvent.setEventName(eventDetails.getEvent().getEventName());
        existingEvent.setContentType(eventDetails.getEvent().getContentType());
        existingEvent.setEventDate(eventDetails.getEvent().getEventDate());
        existingEvent.setEventTime(eventDetails.getEvent().getEventTime());
        existingEvent.setDescription(eventDetails.getEvent().getDescription());
        existingEvent.setEventMode(eventDetails.getEvent().getEventMode());
        existingEvent.setEventStatus(eventDetails.getEvent().getEventStatus());
        existingEvent.setGenre(eventDetails.getEvent().getGenre());
        existingEvent.setHostedByUserId(eventDetails.getUserId());
        existingEvent.setProfit(eventDetails.getEvent().getProfit());
        existingEvent.setParticipantsCount(eventDetails.getEvent().getParticipantsCount());
        existingEvent.setSeatsAvailable(eventDetails.getEvent().getSeatsAvailable());
        existingEvent.setOrganizerCount(eventDetails.getEvent().getOrganizerCount());
        existingEvent.setTermsAndConditions(eventDetails.getEvent().getTermsAndConditions());
        existingEvent.setTicketPrice(eventDetails.getEvent().getTicketPrice());
        existingEvent.setEventPictureId(eventDetails.getEvent().getEventPictureId());
        return existingEvent;
    }

    private void updateJobPost(JobPost jobPost) {
        if(jobPost != null){
            if(jobPost.getJobPostId()==null){
                jobPostService.createJobPost(jobPost);
            }
            else{
                jobPostService.updateJobPost(jobPost.getJobPostId(), jobPost);
            }
        }
    }

    private void updateLocation(Location location) {
        if(location != null){
            locationService.updateLocation(location.getLocationId(), location);
        }
    }

    @Override
    public Optional<EventDetails> getEventDetailsById(Long eventId) {

        Optional<Event> event = eventRepository.findById(eventId);
        EventDetails eventDetails = null;
        if(event.isPresent()) {
            eventDetails = EventMapper.eventToEventDetails(event.get());
        }
        return Optional.ofNullable(eventDetails);
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
    public Page<Event> getEventsByEventStatus(EventStatus eventStatus,Pageable pageable) {

        Specification<Event> spec = Specification.where(null);
        spec.and(EventSpecifications.eventStatus(eventStatus));
        return eventRepository.findAll(spec,pageable);
    }

    @Override
    public Page<Event> getEvents(String searchQuery, List<String> genre, List<String> contentType, List<String> eventMode, List<String> eventStatus, String removeEventStatus, Pageable pageable) {
        Specification<Event> spec = createSpecification(searchQuery, genre, contentType, eventMode, eventStatus);
        Page<Event> eventDetails = eventRepository.findAll(spec, pageable);
        eventDetails = removeEventStatus(eventDetails, removeEventStatus);
        log.debug("Event Details fetched from repository");
        return eventDetails;
    }

    private Specification<Event> createSpecification(String searchQuery, List<String> genre, List<String> contentType, List<String> eventMode, List<String> eventStatus) {
        Specification<Event> spec = Specification.where(null);

        List<ContentType> contentTypes = contentType.stream()
                .map(type -> ContentType.valueOf(type.toUpperCase()))
                .toList();

        List<EventMode> eventModes = eventMode.stream()
                .map(mode -> EventMode.valueOf(mode.toUpperCase()))
                .toList();

        List<EventStatus> eventStatuses = eventStatus.stream()
                .map(status -> EventStatus.valueOf(status.toUpperCase()))
                .toList();

        if (!StringUtils.isEmpty(searchQuery)) {
            spec = spec.and(EventSpecifications.search(searchQuery));
        }
        if (!CollectionUtils.isEmpty(genre)) {
            spec = spec.and(EventSpecifications.genre(genre));
        }
        if (!CollectionUtils.isEmpty(contentType)) {
            spec = spec.and(EventSpecifications.contentType(contentTypes));
        }
        if (!CollectionUtils.isEmpty(eventMode)) {
            spec = spec.and(EventSpecifications.eventMode(eventModes));
        }
        if (!CollectionUtils.isEmpty(eventStatus)) {
            spec = spec.and(EventSpecifications.eventStatus(eventStatuses));
        }
        return spec;
    }

    private Page<Event> removeEventStatus(Page<Event> eventDetails, String removeEventStatus) {
        if(!StringUtils.isEmpty(removeEventStatus)){
            EventStatus status = EventStatus.valueOf(removeEventStatus.toUpperCase());
            List<Event> events = eventDetails.getContent().stream()
                    .filter(event -> !event.getEventStatus().equals(status))
                    .toList();
            return new PageImpl<>(events, eventDetails.getPageable(), events.size());
        }
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

        // TODO -- make chat room as read only
        // TODO -- calculate profit for the event

        List<Event> expiredEvents = eventRepository.findByEventDateAndEventTimeBeforeAndEventStatusNot(
                LocalDate.now(), LocalTime.now(),EventStatus.EXPIRED
        );
        List<Event> organizingEvents = eventRepository.findByEventStatus(EventStatus.ORGANIZING);
        expiredEvents.removeAll(organizingEvents);
        expiredEvents.forEach(event -> {
            event.setEventStatus(EventStatus.EXPIRED);
            if(event.getJobPost()!=null){
                JobPost jobPost = event.getJobPost();
                jobPost.setActive(false);
                jobPostService.createJobPost(jobPost);
            }
            eventRepository.save(event);
        });
    }

    @Override
    public boolean updateEventStatus(Long eventId,EventStatus eventStatus) {

        Optional<Event> event = eventRepository.findById(eventId);
        if(event.isPresent()){
            event.get().setEventStatus(eventStatus);
            if(event.get().getJobPost()!=null && !eventStatus.equals(EventStatus.ORGANIZING)){
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
    public Page<Event> getEventsByEventStatusAndSearch(EventStatus eventStatus,
                                                       Pageable pageable,
                                                       String searchQuery,
                                                       Long hostedByUserId) {

        Specification<Event> spec = Specification.where(null);
        if(!StringUtils.isEmpty(searchQuery)){
            spec = spec.and(EventSpecifications.search(searchQuery));
        }
        if(eventStatus!=null){
            spec = spec.and(EventSpecifications.eventStatus(eventStatus));
        }
        spec = spec.and(EventSpecifications.hostedByUserId(hostedByUserId));
        return eventRepository.findAll(spec,pageable);
    }

    @Override
    public Optional<Participant> registerParticipant(Long eventId, ParticipantDto participantDto) {

        try {
            Optional<Event> event = eventRepository.findById(eventId);
            if (event.isPresent()) {
                Participant participant = new Participant();
                participant.setAbout(participantDto.getAbout());
                participant.setDesignation(participantDto.getDesignation());
                participant.setUserId(participantDto.getUserId());
                participant.setDietaryPreference(participantDto.getDietaryPreference());
                participant.setEmailId(participantDto.getEmailId());
                participant.setFullName(participantDto.getFullName());
                Optional<Participant> savedParticipant = participantService.registerParticipant(event.get(), participant);
                if (savedParticipant.isPresent()) {
                    event.get().setParticipantsCount(event.get().getParticipantsCount() +  1);
                    Event savedEvent = eventRepository.save(event.get());
                    log.info("Participant added to the event:{}", eventId);
                    ParticipationDto participationDto = EventMapper.generateParticipationData(participant, savedEvent);
                    emailProducer.sendParticipationMail(participationDto);
                    return savedParticipant;
                } else {
                    throw new IllegalStateException("Failed to save participant for event: " + eventId);
                }
            } else {
                throw new IllegalArgumentException("Event not found with ID: " + eventId);
            }
        } catch (Exception e) {
            log.error("Error registering participant for event:{}", eventId, e);
            return Optional.empty();
        }
    }

    @Override
    public Event getEvent(Long eventId) {
        return eventRepository.findById(eventId).orElseThrow(
                () -> new NoSuchElementException("Event not found with ID :" + eventId)
        );
    }
}
