package com.waves.chatservice.consumer;

import com.waves.chatservice.chatroom.ChatRoomService;
import com.waves.chatservice.user.ChatUser;
import com.waves.chatservice.user.EventDto;
import com.waves.chatservice.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EventConsumer {

    private final UserService userService;

    private final ChatRoomService chatRoomService;

    public EventConsumer(UserService userService, ChatRoomService chatRoomService) {
        this.userService = userService;
        this.chatRoomService = chatRoomService;
    }

    @KafkaListener(topics = "add-chat-user", containerFactory = "chatUserKafkaListenerContainerFactory")
    public void consumeUserAddingTask(ChatUser chatUser) {
        log.info("Raw message: {}", chatUser.toString());
        userService.addUserToChatRoom(chatUser);
    }

    @KafkaListener(topics = "create-chat-room", containerFactory = "kafkaListenerContainerFactory")
    public void consumeCreateChatRoom(EventDto eventDto){
        log.info("Consumed task to create chat room for {} ", eventDto.toString());
        chatRoomService.getChatRoomId(eventDto.getEventId(),eventDto.getEventName(),true);
    }

    @KafkaListener(topics = "update-chat-room", containerFactory = "kafkaListenerContainerFactory")
    public void consumeUpdateChatRoom(EventDto eventDto){
        log.info("Consumed task to update chat room for {} ", eventDto.toString());
        chatRoomService.updateChatRoomEvent(eventDto);
    }
}
