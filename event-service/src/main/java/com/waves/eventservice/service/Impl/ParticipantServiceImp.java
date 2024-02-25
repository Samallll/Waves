package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.Participant;
import com.waves.eventservice.repository.ParticipantRepository;
import com.waves.eventservice.service.EventService;
import com.waves.eventservice.service.ParticipantService;
import com.waves.eventservice.service.SharedService;
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

    @Override
    public Optional<Participant> registerParticipant(Event event,Participant participant) {

        if(event != null){
            participant.setEvent(event);
            return Optional.of(participantRepository.save(participant));
        }
        return Optional.empty();
    }
}
