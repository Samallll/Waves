package com.waves.authorizationserver.service;

import com.waves.authorizationserver.entity.User;
import com.waves.authorizationserver.entity.dto.EmailDto;
import com.waves.authorizationserver.entity.dto.UserRegisterDto;
import com.waves.authorizationserver.producer.EmailProducer;
import com.waves.authorizationserver.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Slf4j
public class CustomUserServiceDetails implements UserDetailsService {

    private final EmailProducer emailProducer;

    private final UserRepository userRepository;

    public CustomUserServiceDetails(EmailProducer emailProducer, UserRepository userRepository) {
        this.emailProducer = emailProducer;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByEmailId(username);
        if(user != null){
            if(user.isLocked()){
                throw new AccountExpiredException("Account locked by Admin");
            }
            return user;
        }
        throw new UsernameNotFoundException("UserName not found");
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(11);
    }


    public boolean changePassword(String email, String newPassword) {
        User user = userRepository.findByEmailId(email);
        if (user != null) {
            user.setPassword(passwordEncoder().encode(newPassword));
            userRepository.save(user);
            log.trace("User found in Database");
            return true;
        }
        log.debug("User not found!");
        return false;
    }

    public User getUserByEmailId(String emailId){
        return userRepository.findByEmailId(emailId);
    }

    public User registerUser(UserRegisterDto userRegisterDto) {

        User newUser = new User();
        newUser.setRole("USER");
        User user = getUserByEmailId(userRegisterDto.getEmailId());
        if(user != null){
            return new User();
        }
        newUser.setPassword(passwordEncoder().encode(userRegisterDto.getPassword()));
        newUser.setEmailId(userRegisterDto.getEmailId());
        newUser.setFullName(userRegisterDto.getFullName());
        String welcomeMessage = "Welcome aboard, "+ userRegisterDto.getFullName() +"! \n Your email has been verified and you're now officially part of the CrowdCraft family.";
        String subject = "The CrowdCraft crew welcomes you, "+userRegisterDto.getFullName() +"!";
        EmailDto emailDto = new EmailDto();
        emailDto.setToList(userRegisterDto.getEmailId());
        emailDto.setBody(welcomeMessage);
        emailDto.setSubject(subject);
        emailProducer.sendEmail(emailDto);
        return userRepository.save(newUser);

    }

    @Bean
    ApplicationRunner clientsRunner(UserRepository userRepository,
                                    PasswordEncoder passwordEncoder) {
        return args -> {

            if (userRepository.findByRole("ADMIN") == null) {
                User admin = new User(
                        1L,
                        "admin",
                        "admin",
                        passwordEncoder.encode("admin"),
                        "ADMIN",
                        "000000000",
                        false
                );
                userRepository.save(admin);
            }
        };
    }

}
