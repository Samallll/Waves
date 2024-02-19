package com.waves.eventservice.repository;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant,Long> {

    List<Participant> findAllByEvent(Event event);
}
