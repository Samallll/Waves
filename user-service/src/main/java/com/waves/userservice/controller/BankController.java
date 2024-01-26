package com.waves.userservice.controller;

import com.waves.userservice.model.Bank;
import com.waves.userservice.model.UserDto;
import com.waves.userservice.services.BankService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user/bank")
@EnableMethodSecurity
public class BankController {

    private final BankService bankService;

    public BankController(BankService bankService) {
        this.bankService = bankService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Bank> bankDetailsForUser(@PathVariable Long userId){

        Optional<Bank> bank = bankService.getBankDetailsForUser(userId);
        return bank.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<String> createBankDetailsForUser(@PathVariable Long userId, @RequestBody Bank bank){
        boolean bankCreated = bankService.registerBankDetailsForUser(userId, bank);
        if (bankCreated) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Bank details created successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create bank details");
        }
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<String> updateBankDetailsForUser(@PathVariable Long userId, @RequestBody Bank bank) {
        boolean bankUpdated = bankService.updateBankDetailsForUser(userId, bank);
        if (bankUpdated) {
            return ResponseEntity.ok("Bank details updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or bank details not found");
        }
    }

}
