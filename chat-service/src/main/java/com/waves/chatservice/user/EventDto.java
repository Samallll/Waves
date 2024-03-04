package com.waves.chatservice.user;

import lombok.*;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {

    private String eventName;

    private Long eventId;

    private Boolean writeAccess = true;
}
