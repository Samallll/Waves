package com.waves.chatservice.chat;

import com.waves.chatservice.chatroom.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository repository;
    private final ChatRoomService chatRoomService;

    public ChatMessage save(ChatMessage chatMessage) {
        var chatId = chatRoomService
                .getChatRoomId(chatMessage.getEventId(),
                        chatMessage.getEventName(),
                        true)
                .orElseThrow(
                        () -> new RuntimeException("Failed to fetch chat room id")
                );
        chatMessage.setChatId(chatId);
        repository.save(chatMessage);
        return chatMessage;
    }

    public List<ChatMessage> findChatMessages(Long eventId, String eventName) {
        var chatId = chatRoomService.getChatRoomId(eventId, eventName, false);
        return chatId.map(repository::findByChatId).orElse(new ArrayList<>());
    }
}
