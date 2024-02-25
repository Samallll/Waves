package com.waves.eventservice.producer;

import com.waves.eventservice.model.Dto.ParticipantDto;
import com.waves.eventservice.model.Dto.ParticipationDto;
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

    private final KafkaTemplate<String, ParticipationDto> kafkaTemplate;

    public void sendMimeMailTask(ParticipationDto participationDto){
        try{
            CompletableFuture<SendResult<String,ParticipationDto>> future = kafkaTemplate.send("participation-email",participationDto);
            future.whenComplete((result,ex) -> {
                if(ex == null){
                    log.info("Sent message=[" + participationDto.toString() +
                            "] with offset=[" + result.getRecordMetadata().offset() + "]");
                }
                else{
                    log.info("Unable to send message=[" +
                            participationDto.getEmailDto().getToList() + "] due to : " + ex.getMessage());
                }
            });
        }
        catch(Exception exception){
            log.info("ERROR : "+ exception.getMessage());
        }
    }
}
