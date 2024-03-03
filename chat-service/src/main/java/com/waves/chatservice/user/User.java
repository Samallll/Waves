package com.waves.chatservice.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Document
@ToString
public class User {
    @Id
    private String id;
    private Long userId;
    private String fullName;
    private Status status;
    private String emailId;
    private Set<String> chatRooms;
}
