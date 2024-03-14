package com.waves.chatservice.chat;

import com.waves.chatservice.chatroom.ChatRoom;
import com.waves.chatservice.chatroom.ChatRoomService;
import com.waves.chatservice.imageuploader.ImageUploader;
import com.waves.chatservice.user.ChatUser;
import com.waves.chatservice.user.EventDto;
import com.waves.chatservice.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
@EnableMethodSecurity
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;
    private final UserService userService;
    private final ImageUploader imageUploader;

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
                        savedMsg.getTimestamp(),
                        savedMsg.getType()
                )
        );
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','HOST')")
    @GetMapping("/messages/{eventId}/{eventName}")
    public ResponseEntity<List<ChatMessage>> findChatMessages(@PathVariable Long eventId,
                                                 @PathVariable String eventName) {

        return ResponseEntity
                .ok(chatMessageService.findChatMessages(eventId, eventName));
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','HOST')")
    @GetMapping("/chat-rooms/{userId}")
    public ResponseEntity<List<ChatRoom>> getAllChatRoomsForUser(@PathVariable Long userId){

        return ResponseEntity.ok(userService.findAllChatRoomsForUser(userId));
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','HOST')")
    @PostMapping(value = "/send-picture",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> sendChatImage(@RequestParam("file") MultipartFile file){

        String imageUrl = imageUploader.uploadImage(file);
        return ResponseEntity.ok(imageUrl);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','HOST')")
    @GetMapping(value = "/get-picture/{key}",
            produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getChatImage(@PathVariable String key){
        return ResponseEntity.ok(imageUploader.viewImage(key));
    }
}
