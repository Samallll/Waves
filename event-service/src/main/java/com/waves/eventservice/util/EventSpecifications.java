package com.waves.eventservice.util;

import com.waves.eventservice.model.Enum.ContentType;
import com.waves.eventservice.model.Enum.EventMode;
import com.waves.eventservice.model.Enum.EventStatus;
import com.waves.eventservice.model.Event;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class EventSpecifications {

    public static Specification<Event> search(String searchQuery) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(
                criteriaBuilder.lower(root.get("eventName")),
                "%" + searchQuery.toLowerCase() + "%"
        );
    }

    public static Specification<Event> genre(String genre) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("genre"), genre);
    }
    public static Specification<Event> eventStatus(EventStatus eventStatus){
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("eventStatus"),eventStatus));
    }

    public static Specification<Event> genre(List<String> genres) {
        return (root, query, criteriaBuilder) -> root.get("genre").in(genres);
    }

    public static Specification<Event> contentType(List<ContentType> contentTypes) {
        return (root, query, criteriaBuilder) -> root.get("contentType").in(contentTypes);
    }

    public static Specification<Event> eventMode(List<EventMode> eventModes) {
        return (root, query, criteriaBuilder) -> root.get("eventMode").in(eventModes);
    }

    public static Specification<Event> eventStatus(List<EventStatus> eventStatuses) {
        return (root, query, criteriaBuilder) -> root.get("eventStatus").in(eventStatuses);
    }

}

