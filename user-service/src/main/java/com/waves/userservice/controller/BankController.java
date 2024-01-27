package com.waves.userservice.controller;

import com.waves.userservice.model.Bank;
import com.waves.userservice.services.Imp.BankServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user/bank")
@EnableMethodSecurity
public class BankController {

    private final BankServiceImp bankServiceImp;

    public BankController(BankServiceImp bankServiceImp) {
        this.bankServiceImp = bankServiceImp;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Bank> bankDetailsForUser(@PathVariable Long userId){

        Optional<Bank> bank = bankServiceImp.getBankDetailsForUser(userId);
        return bank.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<String> createBankDetailsForUser(@PathVariable Long userId, @RequestBody Bank bank){
        boolean bankCreated = bankServiceImp.registerBankDetailsForUser(userId, bank);
        if (bankCreated) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Bank details created successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create bank details");
        }
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<String> updateBankDetailsForUser(@PathVariable Long userId, @RequestBody Bank bank) {
        boolean bankUpdated = bankServiceImp.updateBankDetailsForUser(userId, bank);
        if (bankUpdated) {
            return ResponseEntity.ok("Bank details updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or bank details not found");
        }
    }

}
