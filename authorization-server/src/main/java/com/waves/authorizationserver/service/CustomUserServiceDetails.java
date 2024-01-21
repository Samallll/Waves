package com.waves.authorizationserver.service;

import com.waves.authorizationserver.entity.User;
import com.waves.authorizationserver.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class CustomUserServiceDetails implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserServiceDetails(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByEmailId(username);
        if(user != null){
            return user;
        }
        throw new UsernameNotFoundException("UserName not found");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(11);
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
