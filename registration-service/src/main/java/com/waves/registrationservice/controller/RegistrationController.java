package com.waves.registrationservice.controller;

import com.waves.registrationservice.client.EmailClient;
import com.waves.registrationservice.model.User;
import com.waves.registrationservice.model.UserRegisterDto;
import com.waves.registrationservice.services.RegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/register")
public class RegistrationController {

    private final RegistrationService registrationService;

    private final EmailClient emailClient;

    public RegistrationController(RegistrationService registrationService, EmailClient emailClient) {
        this.registrationService = registrationService;
        this.emailClient = emailClient;
    }

    @PostMapping("/user")
    public ResponseEntity<String> userRegistration(@RequestBody UserRegisterDto userRegisterDto) {

        User user = registrationService.registerUser(userRegisterDto);

        if (user != null && user.getEmailId()!=null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User creation failed");
        }
    }

    @GetMapping("/emailCheck")
    public ResponseEntity<String> emailIdCheck(@RequestParam String email){

        Optional<User> user = registrationService.getUserByEmailId(email);
        String existingEmailId = user.isPresent()? user.get().getEmailId() : "";
        return ResponseEntity.ok(existingEmailId);
    }

    @GetMapping("/from-email")
    public ResponseEntity<String> helloWorld(){

        return emailClient.testing();
    }

    @GetMapping("/hello")
    public ResponseEntity<String> reachedEmailController(){

        return ResponseEntity.ok("Success");
    }
}
