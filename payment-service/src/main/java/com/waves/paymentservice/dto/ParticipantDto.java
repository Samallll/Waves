package com.waves.paymentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParticipantDto {

    private Long participantId;

    private String about;

    private String designation;

    private String dietaryPreference;

    private Long eventId;

    private Long userId;
}

