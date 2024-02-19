package com.waves.eventservice.service;

import com.waves.eventservice.model.Dto.EventDetails;
import com.waves.eventservice.model.Enum.ContentType;
import com.waves.eventservice.model.Enum.EventMode;
import com.waves.eventservice.model.Enum.EventStatus;
import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface EventService {

    List<Event> getAllEvents();

    Event registerEvent(EventDetails eventDetails);

    Event saveEvent(Event event);

    Optional<EventDetails> updateEvent(EventDetails eventDetails);

    Optional<EventDetails> getEventDetailsById(Long eventId);

    Optional<Event> getEventById(Long eventId);

    List<Event> getEventsByHost(Long hostId);

    Page<Event> getEventsByGenre(String genre,Pageable pageable);

    List<Event> getEventsByEventMode(EventMode eventMode);

    Page<Event> getEventsByEventStatus(EventStatus eventStatus,Pageable pageable);

    List<Event> getEventsByContentType(ContentType contentType);

    Optional<Event> getByJobPost(JobPost jobPost);

    Page<Event> getEvents(String searchQuery,List<String> genre,List<String> contentType,List<String> eventMode,List<String> eventStatus,String removeEventStatus,Pageable pageable);

    String uploadImage(MultipartFile file);

    byte[] viewImage(String key);

    void updateExpiredEventsStatus();

    boolean updateEventStatus(Long eventId,EventStatus eventStatus);

    Page<Event> getEventsByEventStatusAndSearch(EventStatus eventStatus, Pageable pageable, String searchQuery,Long hostedByUserId);
}
