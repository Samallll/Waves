package com.waves.chatservice.user;


import com.waves.chatservice.chatroom.ChatRoom;
import com.waves.chatservice.chatroom.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final ChatRoomService chatRoomService;

    public void saveUser(User user) {
        user.setStatus(Status.ONLINE);
        userRepository.save(user);
    }

    public User createUser(ChatUser chatUser){

        Optional<User> savedUser = userRepository.findByUserId(chatUser.getUserId());
        if(savedUser.isEmpty()){
            User user = new User();
            user.setUserId(chatUser.getUserId());
            user.setStatus(Status.OFFLINE);
            user.setEmailId(chatUser.getEmailId());
            user.setFullName(chatUser.getFullName());
            user.setChatRooms(new HashSet<>());
            log.debug("New User created");
            return userRepository.save(user);
        }
        return savedUser.get();
    }

    public void disconnect(User user) {
        var storedUser = userRepository.findByUserId(user.getUserId()).orElse(null);
        if (storedUser != null) {
            storedUser.setStatus(Status.OFFLINE);
            log.debug("User status updated to: " + Status.OFFLINE);
            userRepository.save(storedUser);
        }
    }

    public List<User> findConnectedUsers() {
        return userRepository.findAllByStatus(Status.ONLINE);
    }

    public User addUserToChatRoom(ChatUser chatUser) {

        User user = createUser(chatUser);
        ChatRoom chatRoom = chatRoomService.addUserToChatRoom(chatUser.getEventId(),
                chatUser.getEventName(), user);
        Set<String> chatRooms;
        if(user.getChatRooms()==null){
            chatRooms = new HashSet<>();
            chatRooms.add(chatRoom.getChatId());
            user.setChatRooms(chatRooms);
        }
        else{
            user.getChatRooms().add(chatRoom.getChatId());
        }
        log.debug("User added to the event with eventId: "+ chatUser.getEventId());
        return userRepository.save(user);
    }

    public List<ChatRoom> findAllChatRoomsForUser(Long userId) {

        return userRepository.findByUserId(userId)
                .map(user -> user.getChatRooms().stream()
                        .map(chatRoomService::findByChatId)
                        .toList())
                .orElseThrow(() -> {
                    log.debug("Failed to fetch chat rooms details for the user: " + userId);
                    return new NoSuchElementException("Failed to fetch the chat room details for the user: " + userId);
                });
    }
}
