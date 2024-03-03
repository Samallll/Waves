package com.waves.eventservice.producer;

import com.waves.eventservice.model.Dto.EmailDto;
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

    private final KafkaTemplate<String, ParticipationDto> kafkaJsonParticipationTemplate;

    private final KafkaTemplate<String,EmailDto> kafkaJsonEmailTemplate;

    public void sendParticipationMail(ParticipationDto participationDto){
        try{
            CompletableFuture<SendResult<String,ParticipationDto>> future = kafkaJsonParticipationTemplate.send("participation-email",participationDto);
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
