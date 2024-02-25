package com.waves.eventservice.util;

import com.waves.eventservice.model.Dto.EmailDto;
import com.waves.eventservice.model.Dto.EventDetails;
import com.waves.eventservice.model.Dto.ParticipantDto;
import com.waves.eventservice.model.Dto.ParticipationDto;
import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.Participant;

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

    /***
     * To create an object that contains basic details about event and the participant details.
     * @param participant
     * @param event
     * @return participationDto
     */
    public static ParticipationDto generateParticipationData(Participant participant, Event event){

        ParticipationDto newParticipationDto = new ParticipationDto();
        newParticipationDto.setParticipantId(participant.getParticipantId());
        newParticipationDto.setEventName(event.getEventName());
        newParticipationDto.setEventDate(event.getEventDate());
        newParticipationDto.setEventTime(event.getEventTime());
        newParticipationDto.setPlace(event.getLocation().getCity());
        newParticipationDto.setTicketPrice(event.getTicketPrice());
        newParticipationDto.setGenre(event.getGenre());

        EmailDto emailDto = new EmailDto();
        emailDto.setSubject("Participation Confirmation");
        emailDto.setToList(participant.getEmailId());
        emailDto.setBody("You are now registered for the event.");
        newParticipationDto.setEmailDto(emailDto);

        return newParticipationDto;
    }
}
