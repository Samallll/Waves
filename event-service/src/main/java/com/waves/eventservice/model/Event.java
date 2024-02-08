package com.waves.eventservice.model;

import com.waves.eventservice.model.Enum.ContentType;
import com.waves.eventservice.model.Enum.EventMode;
import com.waves.eventservice.model.Enum.EventStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    private String eventName;

    @Enumerated(EnumType.STRING)
    private ContentType contentType;

    private LocalDate eventDate;

    private LocalTime eventTime;

    private String description;

    @Enumerated(EnumType.STRING)
    private EventMode eventMode;

    @Enumerated(EnumType.STRING)
    private EventStatus eventStatus;

    private String Genre;

    private Long hostedByUserId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", referencedColumnName = "locationId")
    private Location location;

    private Double profit;

    private Integer seatsAvailable;

    private String termsAndConditions;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "jobPost_id",referencedColumnName = "jobPostId")
    private JobPost jobPost;

}
