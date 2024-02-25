package com.waves.emailservice.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ParticipationDto implements Serializable {

    private Long participantId;

    private String eventName;

    private LocalDate eventDate;

    private LocalTime eventTime;

    private String place;

    private Double ticketPrice;

    private String genre;

    private EmailDto emailDto;

}
