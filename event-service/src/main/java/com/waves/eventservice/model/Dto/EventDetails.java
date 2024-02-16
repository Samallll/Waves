package com.waves.eventservice.model.Dto;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.Location;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EventDetails {

    @NotNull(message = "Event must not be null")
    private Event event;

    private JobPost jobPost;

    @NotNull(message = "Location must not be null")
    private Location location;

    @NotNull(message = "Host userId should not be null")
    private Long userId;
}
