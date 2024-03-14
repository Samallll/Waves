package com.waves.eventservice.controller;

import com.waves.eventservice.model.Dto.ChatUser;
import com.waves.eventservice.model.Dto.EventDetails;
import com.waves.eventservice.model.Dto.ParticipantDto;
import com.waves.eventservice.model.Enum.EventStatus;
import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.Participant;
import lombok.extern.slf4j.Slf4j;
import com.waves.eventservice.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RequestMapping("/api/v1/event")
@RestController
@Slf4j
@RequiredArgsConstructor
@EnableMethodSecurity
public class EventController {

    private final EventService eventService;

    @PreAuthorize("hasRole('HOST')")
    @PostMapping("/add-event")
    public ResponseEntity<String> registerEvent(@Valid @RequestBody EventDetails eventDetails,
                                                BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            log.debug(Objects.requireNonNull(bindingResult.getFieldError()).getDefaultMessage());
            return ResponseEntity.badRequest().body("Request didn't meet the constraints.");
        }
        Event event = eventService.registerEvent(eventDetails);
        if(event==null){
            return ResponseEntity.badRequest().body("Failed to register event");
        }
        return ResponseEntity.ok("Event Created Successfully");
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','HOST')")
    @PostMapping(value = "/add-picture",
                    consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addEventPicture(@RequestParam("file")MultipartFile file){

        String imageUrl = eventService.uploadImage(file);
        return ResponseEntity.ok(imageUrl);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','HOST')")
    @GetMapping(value = "/get-picture/{key}",
                produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getEventPicture(@PathVariable String key){

        return ResponseEntity.ok(eventService.viewImage(key));
    }


    @GetMapping("/events")
    @PreAuthorize("hasAnyRole('USER','ADMIN','HOST')")
    public ResponseEntity<Page<Event>> getEventDetails(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = false) List<String> genre,
            @RequestParam(required = false) List<String> contentType,
            @RequestParam(required = false) List<String> eventMode,
            @RequestParam(required = false) List<String> eventStatus,
            @RequestParam(required = false) String removeEventStatus
    ){
        Pageable pageable = PageRequest.of(page,size);
        Page<Event> eventDetails = eventService.getEvents(searchQuery, genre, contentType, eventMode, eventStatus,removeEventStatus, pageable);
        return ResponseEntity.ok(eventDetails);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','HOST')")
    @GetMapping("/{eventId}")
    public ResponseEntity<EventDetails> getEventDetails(@PathVariable Long eventId){

        Optional<EventDetails> eventDetails = eventService.getEventDetailsById(eventId);
        return eventDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('HOST')")
    @PutMapping("/{eventId}")
    public ResponseEntity<EventDetails> updateEvent(@PathVariable Long eventId,
                                                    @Valid @RequestBody EventDetails eventDetails,
                                                    BindingResult bindingResult) {

        if(bindingResult.hasErrors()){
            return ResponseEntity.notFound().build();
        }
        Optional<EventDetails> updatedEventDetails = eventService.updateEvent(eventDetails);
        return updatedEventDetails.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }


    @GetMapping("/by-genre")
    public ResponseEntity<Page<Event>> getEventDetailsByGenreAndActive(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam(required = true) String genre
    ){
        Pageable pageable = PageRequest.of(page,size);
        Page<Event> eventDetailsByGenre = eventService.getEventsByGenre(genre,pageable);
        return ResponseEntity.ok(eventDetailsByGenre);
    }

    @PreAuthorize("hasRole('HOST')")
    @GetMapping("/update-event-status/{eventId}/{eventStatus}")
    public ResponseEntity<String> updateEventStatus(@PathVariable("eventId") Long eventId,
                                                    @PathVariable("eventStatus") EventStatus eventStatus){

        boolean isSuccessfull = eventService.updateEventStatus(eventId,eventStatus);
        return isSuccessfull ? ResponseEntity.ok("Event Status Updated Successfully") : ResponseEntity.ok("Failed to update Event Status");
    }

    @PreAuthorize("hasRole('HOST')")
    @GetMapping("/by-event-status")
    public ResponseEntity<Page<Event>> getEventsByEventStatusAndHostId(
            @RequestParam(required = false) EventStatus eventStatus,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = true) Long hostedByUserId
    ){
        Pageable pageable = PageRequest.of(page,size);
        Page<Event> eventDetailsByEventStatus = eventService.getEventsByEventStatusAndSearch(eventStatus,pageable,searchQuery,hostedByUserId);
        return ResponseEntity.ok(eventDetailsByEventStatus);
    }

    @PostMapping("/register-participant")
    public ResponseEntity<Participant> registerParticipant(@RequestBody ParticipantDto participantDto){

        Optional<Participant> participant = eventService.registerParticipant(participantDto.getEventId(),participantDto);
        return participant.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }

    @PostMapping("/add-chat-user")
    public ResponseEntity<String> addHostToChatRoom(@RequestBody ChatUser chatUser){

        eventService.addHostToChatRoom(chatUser);
        return ResponseEntity.ok("Host added to chat room");
    }
}
