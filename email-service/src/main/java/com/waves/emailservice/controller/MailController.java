package com.waves.emailservice.controller;

import com.waves.emailservice.model.EmailDto;
import com.waves.emailservice.services.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/email")
public class MailController {

    private final EmailService emailService;

    public MailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/sendMail")
    public ResponseEntity<String> sendEmail(@RequestBody EmailDto emailDto){

        System.out.println("Inside body"+emailDto.getBody());
        String response = emailService.sendMail(emailDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/hello")
    public ResponseEntity<String> testing(){
        return ResponseEntity.ok("Success");
    }
}
