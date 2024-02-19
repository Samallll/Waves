package com.waves.eventservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participantId;

    @NotNull(message = "About should not be null")
    private String about;

    @NotNull(message = "Designation should not be null")
    private String designation;
    @NotNull(message = "Dietary Preference must not be null")
    private String dietaryPreference;

    @ManyToOne
    @JoinColumn(name = "eventId", nullable = false)
    private Event event;

    @NotNull(message = "User Id must not be null")
    private Long userId;

}
