package com.waves.eventservice.model.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatUser {

    private Integer userId;
    private String fullName;
    private String emailId;
    private Integer eventId;
    private String eventName;
}
