package com.waves.eventservice.controller;

import com.waves.eventservice.model.Dto.EventDetails;
import com.waves.eventservice.model.Event;
import lombok.extern.slf4j.Slf4j;
import com.waves.eventservice.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@RequestMapping("/api/v1/event")
@RestController
@Slf4j
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

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

    @PostMapping(value = "/add-picture",
                    consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addEventPicture(@RequestParam("file")MultipartFile file){

        String imageUrl = eventService.uploadImage(file);
        return ResponseEntity.ok(imageUrl);
    }

    @GetMapping("/get-picture/{key}")
    public ResponseEntity<byte[]> getEventPicture(@PathVariable String key){

        return ResponseEntity.ok(eventService.viewImage(key));
    }

    @GetMapping("/events")
    public ResponseEntity<Page<Event>> getEventDetails(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = false) List<String> genre,
            @RequestParam(required = false) List<String> contentType,
            @RequestParam(required = false) List<String> eventMode,
            @RequestParam(required = false) List<String> eventStatus
    ){
        Pageable pageable = PageRequest.of(page,size);
        Page<Event> eventDetails = eventService.getEvents(searchQuery, genre, contentType, eventMode, eventStatus, pageable);
        return ResponseEntity.ok(eventDetails);
    }
}
