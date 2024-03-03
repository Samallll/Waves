package com.waves.chatservice.chatroom;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.List;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {

    Optional<ChatRoom> findByEventId(Long eventId);

    ChatRoom findByChatId(String chatId);
}
