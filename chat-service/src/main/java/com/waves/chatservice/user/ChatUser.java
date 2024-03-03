package com.waves.chatservice.user;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ChatUser {

    private Long userId;
    private String fullName;
    private String emailId;
    private Long eventId;
    private String eventName;
}
