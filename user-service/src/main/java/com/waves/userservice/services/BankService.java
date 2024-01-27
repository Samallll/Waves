package com.waves.userservice.services;

import com.waves.userservice.model.Bank;

import java.util.Optional;

public interface BankService {

    Optional<Bank> getBankDetailsForUser(Long userId);

    boolean registerBankDetailsForUser(Long userId, Bank bank);

    boolean updateBankDetailsForUser(Long userId, Bank bank);
}
