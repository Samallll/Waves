package com.waves.emailservice.consumer;

import com.waves.emailservice.model.EmailDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class HostEmailConsumer {

    @KafkaListener(topics = "email")
    public void consumeEvents(EmailDto emailDto) {
        log.info("consumer consume the events {} ", emailDto.getToList());
    }

//    When you send object as string
//    @KafkaListener(topics = "email")
//    public void receiveEmail(String json) {
//        try {
//            EmailDto emailDto = new ObjectMapper().readValue(json, EmailDto.class);
//            // Process the emailDto object here
//            System.out.println("Received email: " + emailDto);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            // Handle deserialization error
//        }
//    }
}
