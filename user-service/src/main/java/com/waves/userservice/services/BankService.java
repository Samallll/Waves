package com.waves.userservice.services;

import com.waves.userservice.model.Bank;
import com.waves.userservice.model.User;
import com.waves.userservice.repository.BankRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class BankService {

    private final UserService userService;

    private final BankRepository bankRepository;

    public BankService(UserService userService, BankRepository bankRepository) {
        this.userService = userService;
        this.bankRepository = bankRepository;
    }

    public Optional<Bank> getBankDetailsForUser(Long userId) {

        Optional<User> user = userService.getUserDetails(userId);
        if(user.isPresent()){
            return bankRepository.findByUser(user.get());
        }
        else{
            log.debug("Bank Details not found");
            return Optional.empty();
        }
    }

    public boolean registerBankDetailsForUser(Long userId, Bank bank) {

        Optional<User> user = userService.getUserDetails(userId);
        if(user.isPresent()){
            Bank newBank = new Bank(bank.getBankName(),
                    bank.getBeneficiaryName(),
                    bank.getIFSC(),
                    bank.getAccountNumber(),
                    bank.getAccountType());
            newBank.setUser(user.get());
            bankRepository.save(newBank);
            log.trace("Bank Details Created");
            return true;
        }
        log.debug("Failed to create the bank details");
        return false;
    }

    public boolean updateBankDetailsForUser(Long userId, Bank bank) {

        Optional<User> user = userService.getUserDetails(userId);
        if(user.isPresent()){
            Bank existingBank = user.get().getBank();
            existingBank.setBankName(bank.getBankName());
            existingBank.setIFSC(bank.getIFSC());
            existingBank.setAccountType(bank.getAccountType());
            existingBank.setAccountNumber(bank.getAccountNumber());
            existingBank.setBeneficiaryName(bank.getBeneficiaryName());
            bankRepository.save(existingBank);
            log.trace("Bank Details Updated");
            return true;
        }
        log.debug("Failed to update the bank details");
        return false;
    }
}
