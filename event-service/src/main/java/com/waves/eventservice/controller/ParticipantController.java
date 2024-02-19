package com.waves.eventservice.controller;

import com.waves.eventservice.model.Participant;
import com.waves.eventservice.service.ParticipantService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/event/participate")
public class ParticipantController {

    private final ParticipantService participantService;

    public ParticipantController(ParticipantService participantService) {
        this.participantService = participantService;
    }

    @PostMapping("/register/{eventId}")
    @PreAuthorize("hasAnyRole('USER','HOST')")
    public ResponseEntity<Participant> registerUserForParticipation(@PathVariable Long eventId,
            @RequestBody Participant participant){

        Optional<Participant> savedParticipant = participantService.registerParticipant(eventId,participant);
        return savedParticipant.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
