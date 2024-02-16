package com.waves.eventservice.repository;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location,Long> {

    Optional<Location> findByEvent(Event event);
}
