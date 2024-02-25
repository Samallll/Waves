package com.waves.emailservice.consumer;

import com.waves.emailservice.dto.ParticipationDto;
import com.waves.emailservice.services.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EventEmailConsumer {

    private final EmailService emailService;

    public EventEmailConsumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @KafkaListener(topics = "participation-email" , containerFactory = "participationKafkaListenerContainerFactory")
    public void consumeParticipationEmailTask(ParticipationDto participationDto){
        emailService.sendParticipationMail(participationDto.getEmailDto(),participationDto);
        log.info("consumer consume the events {} ", participationDto);
    }
}
