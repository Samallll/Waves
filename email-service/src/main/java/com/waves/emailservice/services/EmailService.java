package com.waves.emailservice.services;

import com.waves.emailservice.dto.EmailDto;
import com.waves.emailservice.dto.ParticipationDto;

public interface EmailService {
    String sendMail(EmailDto emailDto);

    void sendParticipationMail(EmailDto emailDto,ParticipationDto participationDto);

}
