package com.waves.chatservice.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatNotification {
    private String id;
    private String chatId;
    private Long eventId;
    private String fullName;
    private String eventName;
    private String content;
    private Date timestamp;
}
