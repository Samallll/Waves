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

    Event updateEvent(Event event);

    boolean registerUserForParticipation(Long userId,Long eventId);

    Optional<Event> getEventById(Long eventId);

    List<Event> getEventsByHost(Long hostId);

    List<Event> getEventsByGenre(String genre);

    List<Event> getEventsByEventMode(EventMode eventMode);

    List<Event> getEventsByEventStatus(EventStatus eventStatus);

    List<Event> getEventsByContentType(ContentType contentType);

    Optional<Event> getByJobPost(JobPost jobPost);

    Page<Event> getEvents(String searchQuery,List<String> genre,List<String> contentType,List<String> eventMode,List<String> eventStatus,Pageable pageable);

    String uploadImage(MultipartFile file);

    byte[] viewImage(String key);
}
