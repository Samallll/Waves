package com.waves.chatservice.chatroom;

import com.waves.chatservice.user.ChatUser;
import com.waves.chatservice.user.EventDto;
import com.waves.chatservice.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public Optional<String> getChatRoomId(
            Long eventId,
            String eventName,
            boolean createNewRoomIfNotExists
    ) {

        return chatRoomRepository
                .findByEventId(eventId)
                .map(ChatRoom::getChatId)
                .or(() -> {
                    if(createNewRoomIfNotExists) {
                        System.out.println("Chat room creating : ****************************");
                        var chatId = createChatId(eventId, eventName);
                        return Optional.of(chatId);
                    }
                    return  Optional.empty();
                });
    }

    private synchronized String createChatId(Long eventId, String eventName) {
        var chatId = String.format("%d_%s", eventId, eventName);
        ChatRoom existingChatRoom = chatRoomRepository.findByChatId(chatId);
        if (existingChatRoom != null) {
            log.info("ChatId already exists for the event: " + eventId);
            return existingChatRoom.getChatId();
        } else {
            ChatRoom newChatRoom = ChatRoom
                    .builder()
                    .chatId(chatId)
                    .eventId(eventId)
                    .eventName(eventName)
                    .build();
            chatRoomRepository.save(newChatRoom);
            log.info("ChatId created for the event: " + eventId);
            return chatId;
        }
    }


    public ChatRoom addUserToChatRoom(Long eventId,String eventName,User user) {

        Optional<ChatRoom> chatRoom = chatRoomRepository.findByEventId(eventId);
        ChatRoom savedChatRoom;
        if(chatRoom.isPresent()){
            savedChatRoom = chatRoom.get();
            savedChatRoom.getUsers().add(user);
        }
        else {
            System.out.println("Inside chatroom service: "+ chatRoom.toString());
            String chatId = createChatId(eventId,eventName);
            System.out.println("Inside chatroom service - chatId: "+ chatId);
            savedChatRoom = chatRoomRepository.findByChatId(chatId);
            System.out.println("Finding the chat room id - chatId: "+ savedChatRoom.getChatId());
            Set<User> users = new HashSet<>();
            users.add(user);
            savedChatRoom.setUsers(users);
        }
        return chatRoomRepository.save(savedChatRoom);
    }

    public ChatRoom updateChatRoomEvent(EventDto eventDto) {
        return chatRoomRepository.findByEventId(eventDto.getEventId())
                .map(chatRoom -> {
                    chatRoom.setEventName(eventDto.getEventName());
                    chatRoom.setWriteAccess(eventDto.getWriteAccess());
                    return chatRoomRepository.save(chatRoom);
                })
                .orElseThrow(() -> new NoSuchElementException("Chat Room not found for event id: " + eventDto.getEventId()));
    }


    public ChatRoom findByChatId(String chatId) {
        return chatRoomRepository.findByChatId(chatId);
    }
}
