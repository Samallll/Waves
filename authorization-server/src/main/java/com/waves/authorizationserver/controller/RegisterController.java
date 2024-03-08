package com.waves.authorizationserver.controller;

import com.waves.authorizationserver.entity.User;
import com.waves.authorizationserver.entity.dto.UserRegisterDto;
import com.waves.authorizationserver.service.CustomUserServiceDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/v1/register")
public class RegisterController {

    private final CustomUserServiceDetails userService;

    public RegisterController(CustomUserServiceDetails userService) {
        this.userService = userService;
    }
    // TODO -- add /register in the request from the front end.
    @PostMapping("/user")
    public ResponseEntity<String> userRegistration(@RequestBody UserRegisterDto userRegisterDto) {

        User user = userService.registerUser(userRegisterDto);

        if (user != null && user.getEmailId()!=null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User creation failed");
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> changePassword(@RequestBody UserRegisterDto userRegisterDto ){

        boolean passwordToggle = userService.changePassword(userRegisterDto.getEmailId(),userRegisterDto.getPassword());
        if(passwordToggle){
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Password updated successfully");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Password modification failed");
        }
    }

    @GetMapping("/emailCheck")
    public ResponseEntity<String> emailIdCheck(@RequestParam String email){

        User user = userService.getUserByEmailId(email);
        String existingEmailId = user != null ? user.getEmailId() : "";
        return ResponseEntity.ok(existingEmailId);
    }
}
