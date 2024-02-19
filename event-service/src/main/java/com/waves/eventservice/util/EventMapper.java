package com.waves.eventservice.util;

import com.waves.eventservice.model.Dto.EventDetails;
import com.waves.eventservice.model.Event;

public class EventMapper {

    public static EventDetails eventToEventDetails(Event event){

        EventDetails eventDetails = new EventDetails();
        eventDetails.setEvent(event);
        eventDetails.setLocation(event.getLocation());
        eventDetails.setJobPost(event.getJobPost());
        eventDetails.setUserId(event.getHostedByUserId());
        return  eventDetails;
    }

    public static Event eventDetailsToEvent(EventDetails eventDetails){

        Event event = new Event();

        event.setEventId(eventDetails.getEvent().getEventId());
        event.setEventName(eventDetails.getEvent().getEventName());
        event.setContentType(eventDetails.getEvent().getContentType());
        event.setEventDate(eventDetails.getEvent().getEventDate());
        event.setEventTime(eventDetails.getEvent().getEventTime());
        event.setDescription(eventDetails.getEvent().getDescription());
        event.setEventMode(eventDetails.getEvent().getEventMode());
        event.setEventStatus(eventDetails.getEvent().getEventStatus());
        event.setGenre(eventDetails.getEvent().getGenre());

        event.setHostedByUserId(eventDetails.getUserId());

        event.setLocation(eventDetails.getLocation());
        event.setProfit(eventDetails.getEvent().getProfit());
        event.setParticipantsCount(eventDetails.getEvent().getParticipantsCount());
        event.setSeatsAvailable(eventDetails.getEvent().getSeatsAvailable());
        event.setOrganizerCount(eventDetails.getEvent().getOrganizerCount());
        event.setTermsAndConditions(eventDetails.getEvent().getTermsAndConditions());
        event.setJobPost(eventDetails.getJobPost());
        event.setTicketPrice(eventDetails.getEvent().getTicketPrice());
        event.setEventPictureId(eventDetails.getEvent().getEventPictureId());

        return event;

    }
}
