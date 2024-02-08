package com.waves.hostservice.producer;

import com.waves.hostservice.model.dto.EmailDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserProducer {

    private final KafkaTemplate<String, Long> longKafkaTemplate;

    public void upgradeToHost(Long userId){

        try {
            CompletableFuture<SendResult<String, Long>> future = longKafkaTemplate.send("host-request-approved", userId);
            future.whenComplete((result, ex) -> {
                if (ex == null) {
                    log.info("Sent message=[" + userId +
                            "] with offset=[" + result.getRecordMetadata().offset() + "]");
                } else {
                    log.info("Unable to send message=[" +
                            userId + "] due to : " + ex.getMessage());
                }
            });

        } catch (Exception ex) {
            log.info("ERROR : "+ ex.getMessage());
        }
    }

}
