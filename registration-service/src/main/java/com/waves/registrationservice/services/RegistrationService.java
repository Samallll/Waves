package com.waves.registrationservice.services;

import com.waves.registrationservice.client.EmailClient;
import com.waves.registrationservice.model.EmailDto;
import com.waves.registrationservice.model.User;
import com.waves.registrationservice.model.UserRegisterDto;
import com.waves.registrationservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class RegistrationService implements UserDetailsService {

    private final UserRepository userRepository;

    private final EmailClient emailClient;

    public RegistrationService(UserRepository userRepository, EmailClient emailClient) {
        this.userRepository = userRepository;
        this.emailClient = emailClient;
    }

    public boolean changePassword(String email, String newPassword){

        Optional<User> user = userRepository.findByEmailId(email);
        if(user.isPresent()){
            user.get().setPassword(passwordEncoder().encode(newPassword));
            userRepository.save(user.get());
            log.trace("User found in Database");
            return true;
        }
        log.debug("User not found!");
        return false;
    }

    public Optional<User> getUserByEmailId(String emailId){
        return userRepository.findByEmailId(emailId);
    }

    public User registerUser(UserRegisterDto userRegisterDto) {

        User newUser = new User();
        newUser.setRole("USER");
        Optional<User> user = getUserByEmailId(userRegisterDto.getEmailId());
        if(user.isPresent()){
            return new User();
        }
        newUser.setPassword(passwordEncoder().encode(userRegisterDto.getPassword()));
        newUser.setEmailId(userRegisterDto.getEmailId());
        newUser.setFullName(userRegisterDto.getFullName());
        String welcomeMessage = "Welcome aboard, "+ userRegisterDto.getFullName() +"! Your email has been verified and you're now officially part of the CrowdCraft family.";
        String subject = "The CrowdCraft crew welcomes you, "+userRegisterDto.getFullName() +"!";
        emailClient.sendEmail(new EmailDto(userRegisterDto.getEmailId(),subject,welcomeMessage));
        return userRepository.save(newUser);

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmailId(username);
        if(user.isPresent()){
            return user.get();
        }
        throw new UsernameNotFoundException("UserName not found");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(11);
    }
}
