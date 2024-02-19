package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.Participant;
import com.waves.eventservice.repository.ParticipantRepository;
import com.waves.eventservice.service.EventService;
import com.waves.eventservice.service.ParticipantService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ParticipantServiceImp implements ParticipantService {

    private final ParticipantRepository participantRepository;

    private final EventService eventService;

    @Override
    @Transactional
    public Optional<Participant> registerParticipant(Long eventId,Participant participant) {

        Optional<Event> event = eventService.getEventById(eventId);
        if(event.isPresent()){
            participant.setEvent(event.get());
            event.get().setParticipantsCount(event.get().getParticipantsCount()+1);
            eventService.saveEvent(event.get());
            log.debug("Participant added to the event:{}",eventId);
            return Optional.of(participantRepository.save(participant));
        }
        return Optional.empty();
    }

    @Override
    public Optional<Participant> getParticipantById(Long participantId) {
        return participantRepository.findById(participantId);
    }

    @Override
    public List<Participant> getParticipantsByEvent(Event event) {
        return participantRepository.findAllByEvent(event);
    }
}
