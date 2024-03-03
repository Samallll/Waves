package com.waves.chatservice.chat;

import com.waves.chatservice.chatroom.ChatRoom;
import com.waves.chatservice.chatroom.ChatRoomService;
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

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;
    private final UserService userService;

    @MessageMapping("/event/{eventId}")
    public void processMessage(@DestinationVariable Long eventId, @Payload ChatMessage chatMessage) {

        System.out.println("Event id: " + eventId);
        System.out.println("ChatMessage:" + chatMessage.toString());

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

    @MessageMapping("/message")
    public ChatMessage receiveMessage(@Payload ChatMessage chatMessage){
        return chatMessage;
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
