package com.waves.eventservice.repository;

import com.waves.eventservice.model.Enum.ContentType;
import com.waves.eventservice.model.Enum.EventMode;
import com.waves.eventservice.model.Enum.EventStatus;
import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {

    List<Event> findByHostedByUserId(Long hostedByUserId);

    List<Event> findByGenre(String genre);

    Optional<Event> findByJobPost(JobPost jobPost);

    List<Event> findByEventStatus(EventStatus eventStatus);

    List<Event> findByEventMode(EventMode eventMode);

    List<Event> findByContentType(ContentType contentType);

    List<Event> findByEventNameContaining(String eventName);

    Page<Event> findByEventNameContaining(String eventName, Pageable pageable);

    Optional<Event> findByEventName(String eventName);

    Page<Event> findAll(Specification<Event> spec, Pageable pageable);

    List<Event> findByEventDateAndEventTimeBeforeAndEventStatusNot(LocalDate now, LocalTime now1, EventStatus eventStatus);
}
