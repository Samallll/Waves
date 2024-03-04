package com.waves.chatservice.chatroom;

import com.waves.chatservice.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class ChatRoom {
    @Id
    private String id;
    private String chatId; // to get the details of the chat
    private Long eventId;
    private String eventName;
    private Boolean writeAccess;

    @DBRef
    private Set<User> users;
}
