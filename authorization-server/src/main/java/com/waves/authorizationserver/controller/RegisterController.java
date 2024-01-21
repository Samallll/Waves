package com.waves.authorizationserver.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RegisterController {

    @GetMapping("/registration")
    public ResponseEntity<String> userRegistration(){
        return ResponseEntity.ok("Registering.....");
    }
}
