package com.waves.hostservice.producer;

import com.waves.hostservice.model.dto.EmailDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailProducer {

    private final KafkaTemplate<String,EmailDto> kafkaJsonTemplate;

    private final KafkaTemplate<String,String> kafkaTemplate;

    public void sendEmailTask(EmailDto emailDto) {
        try {
            CompletableFuture<SendResult<String, EmailDto>> future = kafkaJsonTemplate.send("email", emailDto);
            future.whenComplete((result, ex) -> {
                if (ex == null) {
                    log.info("Sent message=[" + emailDto.toString() +
                            "] with offset=[" + result.getRecordMetadata().offset() + "]");
                } else {
                    log.info("Unable to send message=[" +
                            emailDto.toString() + "] due to : " + ex.getMessage());
                }
            });

        } catch (Exception ex) {
            log.info("ERROR : "+ ex.getMessage());
        }
    }

//    When you are sending the Object as a String
//    public void sendEmailTask(EmailDto emailDto) {
//        log.info(String.format("Sending message to email Topic:: %s", emailDto.toString()));
//        String json = null;
//        try {
//            json = new ObjectMapper().writeValueAsString(emailDto);
//        } catch (JsonProcessingException e) {
//            System.out.println(e.getMessage());
//        }
//        kafkaTemplate.send("email", json);
//    }

}
