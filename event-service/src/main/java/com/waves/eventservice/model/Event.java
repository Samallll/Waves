package com.waves.eventservice.model;

import com.waves.eventservice.model.Enum.ContentType;
import com.waves.eventservice.model.Enum.EventMode;
import com.waves.eventservice.model.Enum.EventStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    @NotNull(message = "Event name must not be null")
    @Column(unique = true)
    private String eventName;

    @Enumerated(EnumType.STRING)
    private ContentType contentType;

    private LocalDate eventDate;

    private LocalTime eventTime;

    @Size(min =  10, message = "About the Event must be more than  10 characters long")
    private String description;

    @Enumerated(EnumType.STRING)
    private EventMode eventMode;

    @Enumerated(EnumType.STRING)
    private EventStatus eventStatus;

    @Pattern(regexp = "^[a-zA-Z]+$", message = "Genre must contain only English letters and be at least  3 characters long")
    @Size(min =  3, message = "Genre must be at least  3 characters long")
    private String genre;

    private Long hostedByUserId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "location_id", referencedColumnName = "locationId")
    private Location location;

    private Double profit;

    @Min(value =  1, message = "Seats available must be a positive number greater than zero")
    private Integer seatsAvailable;

    @Min(value =  0, message = "Organizer count must be a positive number")
    private Integer organizerCount;

    @Size(min =  10, message = "About the Event must be more than  10 characters long")
    private String termsAndConditions;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "jobPost_id",referencedColumnName = "jobPostId")
    private JobPost jobPost;

    @NotNull(message = "Ticket Price should not be null")
    private Double ticketPrice;

    @NotNull(message = "Event Picture should not null")
    private String eventPictureId;

}
