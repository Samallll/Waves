package com.waves.emailservice.controller;

import com.waves.emailservice.model.EmailDto;
import com.waves.emailservice.services.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailController {

    private final EmailService emailService;

    public MailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/sendMail")
    public ResponseEntity<String> sendEmail(@RequestBody EmailDto emailDto){

        String response = emailService.sendMail(emailDto);
        return ResponseEntity.ok(response);
    }
}
