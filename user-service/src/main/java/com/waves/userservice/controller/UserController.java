package com.waves.userservice.controller;

import com.waves.userservice.model.UserDto;
import com.waves.userservice.services.UserService;
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
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/toggleBlock")
    public ResponseEntity<String> toggleUserBlock(@RequestParam Long userId){

        boolean statusChanged = userService.toggleLockStatus(userId);
        return statusChanged ? ResponseEntity.status(HttpStatus.CREATED).body("Status flipped"):
                ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Failed to modify");
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<UserDto>> getAllUsers(){

        System.out.println("inside all users");
        List<UserDto> users = userService.getAllUsersWithDetails();
        users.forEach(x-> System.out.println(x.getFullName()));
        return ResponseEntity.ok(users);
    }

    @GetMapping("/hello")
    public ResponseEntity<String> testing(){
        return ResponseEntity.ok("success");
    }
}
