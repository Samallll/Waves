package com.waves.authorizationserver.producer;

import com.waves.authorizationserver.entity.dto.EmailDto;
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

    private final KafkaTemplate<String, EmailDto> kafkaJsonEmailTemplate;

    public void sendEmail(EmailDto emailDto) {
        try {
            CompletableFuture<SendResult<String, EmailDto>> future = kafkaJsonEmailTemplate.send("email", emailDto);
            future.whenComplete((result, ex) -> {
                if (ex == null) {
                    log.info("Sent message=[" + emailDto.getToList() +
                            "] with offset=[" + result.getRecordMetadata().offset() + "]");
                } else {
                    log.info("Unable to send message=[" +
                            emailDto.getToList() + "] due to : " + ex.getMessage());
                }
            });

        } catch (Exception ex) {
            log.info("ERROR : "+ ex.getMessage());
        }
    }

}
