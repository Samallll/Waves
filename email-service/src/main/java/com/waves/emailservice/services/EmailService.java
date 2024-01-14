package com.waves.emailservice.services;

import com.waves.emailservice.model.EmailDto;

public interface EmailService {
    String sendMail(EmailDto emailDto);
}
