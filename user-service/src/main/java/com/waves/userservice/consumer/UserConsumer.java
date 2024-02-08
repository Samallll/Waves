package com.waves.userservice.consumer;

import com.waves.userservice.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserConsumer {

    private final UserService userService;

    @KafkaListener(topics = "host-request-approved")
    public void upgradeUserToHost(Long userId){

        log.debug("consumer consume the events for user upgrade {} ", userId);
        userService.upgradeToHost(userId);
    }
}
