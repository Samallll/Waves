package com.waves.chatservice.chat;

import com.waves.chatservice.chatroom.ChatRoom;
import com.waves.chatservice.chatroom.ChatRoomService;
import com.waves.chatservice.user.ChatUser;
import com.waves.chatservice.user.EventDto;
import com.waves.chatservice.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;
    private final UserService userService;

    @MessageMapping("/event/{eventId}")
    public void processMessage(@DestinationVariable Long eventId, @Payload ChatMessage chatMessage) {

        ChatMessage savedMsg = chatMessageService.save(chatMessage);
        messagingTemplate.convertAndSend(
                "/topic/event/"+ eventId,
                new ChatNotification(
                        savedMsg.getId(),
                        savedMsg.getChatId(),
                        savedMsg.getEventId(),
                        savedMsg.getFullName(),
                        savedMsg.getEventName(),
                        savedMsg.getContent(),
                        savedMsg.getTimestamp()
                )
        );
    }

    @GetMapping("/messages/{eventId}/{eventName}")
    public ResponseEntity<List<ChatMessage>> findChatMessages(@PathVariable Long eventId,
                                                 @PathVariable String eventName) {

        return ResponseEntity
                .ok(chatMessageService.findChatMessages(eventId, eventName));
    }

    @GetMapping("/chat-rooms/{userId}")
    public ResponseEntity<List<ChatRoom>> getAllChatRoomsForUser(@PathVariable Long userId){

        return ResponseEntity.ok(userService.findAllChatRoomsForUser(userId));
    }
}
