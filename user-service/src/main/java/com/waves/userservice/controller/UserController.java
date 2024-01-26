package com.waves.userservice.controller;

import com.waves.userservice.model.Bank;
import com.waves.userservice.model.UserDto;
import com.waves.userservice.services.BankService;
import com.waves.userservice.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        Optional<UserDto> userDto = userService.getUserDtoDetails(userId);
        return userDto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(null));
    }

    @GetMapping("/email/{email}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<UserDto> getUserDetails(@PathVariable String email){
        Optional<UserDto> userDto = userService.getuserDetailsByEmail(email);
        return userDto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(null));
    }

    @PreAuthorize("hasAnyRole('USER','HOST','ADMIN')")
    @PutMapping("/update-user")
    public ResponseEntity<String> updateUser(@RequestBody UserDto userDto){

        if(userDto.getUserId() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid User Id");
        }
        boolean userUpdationStatus = userService.updateUser(userDto);

        return userUpdationStatus?
            ResponseEntity.status(HttpStatus.OK).body("User data updated"):
            ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Failed to update the data");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/search-user/{emailId}")
    public ResponseEntity<List<UserDto>> searchUsersByEmailId(@PathVariable String emailId){

        List<UserDto> users = userService.findUsersByEmailId(emailId);
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @GetMapping("/users")
    public ResponseEntity<Page<UserDto>> getUsersByPaginationAndSearch(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchQuery) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<UserDto> usersPage = userService.getUsersByPaginationAndSearch(pageable, searchQuery);
        return ResponseEntity.ok(usersPage);
    }


    @GetMapping("/hello")
    public ResponseEntity<String> testing(){
        return ResponseEntity.ok("success");
    }
}
