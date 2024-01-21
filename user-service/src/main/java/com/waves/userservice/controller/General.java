package com.waves.userservice.controller;

import com.waves.userservice.model.User;
import com.waves.userservice.model.UserRegisterDto;
import com.waves.userservice.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/user")
public class General {

    private final UserService userService;

    public General(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> userRegistration(@RequestBody UserRegisterDto userRegisterDto){

        //user registration
        User user = userService.registerUser(userRegisterDto);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/emailCheck")
    public ResponseEntity<String> emailIdCheck(@RequestParam String emailId){

        Optional<User> user = userService.getUserByEmailId(emailId);
        String existingEmailId = user.isPresent()? user.get().getEmailId() : "";
        return ResponseEntity.ok(existingEmailId);
    }
}
