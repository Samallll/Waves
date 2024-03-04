package com.waves.eventservice.model.Dto;

import lombok.*;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {

    private String eventName;

    private Long eventId;

    private Boolean writeAccess;
}
