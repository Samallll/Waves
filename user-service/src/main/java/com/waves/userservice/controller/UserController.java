package com.waves.userservice.controller;

import com.waves.userservice.model.UserDto;
import com.waves.userservice.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@EnableMethodSecurity
@Slf4j
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/lock/{userId}")
    public ResponseEntity<String> userBlock(@PathVariable Long userId){

        boolean statusChanged = userService.lockUser(userId);
        return statusChanged ? ResponseEntity.status(HttpStatus.CREATED).body("Account Locked"):
                ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Failed to modify");
    }

    @GetMapping("/unlock/{userId}")
    public ResponseEntity<String> userUnBlock(@PathVariable Long userId){

        boolean statusChanged = userService.unlockUser(userId);
        return statusChanged ? ResponseEntity.status(HttpStatus.CREATED).body("Account UnLocked"):
                ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Failed to modify");
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<UserDto>> getAllUsers(){

        List<UserDto> users = userService.getAllUsersWithDetails();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
//    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserDto> getUserDetails(@PathVariable Long userId){
        Optional<UserDto> userDto = userService.getuserDetails(userId);
        return userDto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(null));
    }

    @GetMapping("/email/{email}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserDto> getUserDetails(@PathVariable String email){
        Optional<UserDto> userDto = userService.getuserDetailsByEmail(email);
        return userDto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(null));
    }


    @GetMapping("/hello")
    public ResponseEntity<String> testing(){
        return ResponseEntity.ok("success");
    }
}
