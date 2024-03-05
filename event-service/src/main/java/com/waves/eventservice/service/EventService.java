package com.waves.eventservice.service;

import com.waves.eventservice.model.Dto.ChatUser;
import com.waves.eventservice.model.Dto.EventDetails;
import com.waves.eventservice.model.Dto.ParticipantDto;
import com.waves.eventservice.model.Enum.ContentType;
import com.waves.eventservice.model.Enum.EventMode;
import com.waves.eventservice.model.Enum.EventStatus;
import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.Participant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface EventService {

    Event registerEvent(EventDetails eventDetails);

    Optional<EventDetails> updateEvent(EventDetails eventDetails);

    Optional<EventDetails> getEventDetailsById(Long eventId);

    Page<Event> getEventsByGenre(String genre,Pageable pageable);

    Page<Event> getEventsByEventStatus(EventStatus eventStatus,Pageable pageable);

    Page<Event> getEvents(String searchQuery,List<String> genre,List<String> contentType,List<String> eventMode,List<String> eventStatus,String removeEventStatus,Pageable pageable);

    String uploadImage(MultipartFile file);

    byte[] viewImage(String key);

    void updateExpiredEventsStatus();

    boolean updateEventStatus(Long eventId,EventStatus eventStatus);

    Page<Event> getEventsByEventStatusAndSearch(EventStatus eventStatus, Pageable pageable, String searchQuery,Long hostedByUserId);

    Optional<Participant> registerParticipant(Long eventId, ParticipantDto participantDto);

    Event getEvent(Long eventId);

    void addHostToChatRoom(ChatUser chatUser);
}
