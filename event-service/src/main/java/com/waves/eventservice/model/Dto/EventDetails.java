package com.waves.eventservice.model.Dto;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.Location;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EventDetails {

    private Event event;

    private JobPost jobPost;

    private Location location;
}
