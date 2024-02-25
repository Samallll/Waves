package com.waves.emailservice.consumer;

import com.waves.emailservice.dto.EmailDto;
import com.waves.emailservice.services.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailConsumer {

    private final EmailService emailService;

    public EmailConsumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @KafkaListener(topics = "email", containerFactory = "kafkaListenerContainerFactory")
    public void consumeEvents(EmailDto emailDto) {
        log.info("consumer consume the events {} ", emailDto.getToList());
        emailService.sendMail(emailDto);
    }

}
