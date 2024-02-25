package com.waves.eventservice.service;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.Participant;

import java.util.List;
import java.util.Optional;

public interface ParticipantService {

    Optional<Participant> registerParticipant(Event event,Participant participant);

}
