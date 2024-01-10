package com.waves.authorizationserver.config;

import com.waves.authorizationserver.entity.User;
import com.waves.authorizationserver.repository.UserRepository;
import com.waves.authorizationserver.service.CustomAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SpringSecurityConfiguration {

    // http://127.0.0.1:8000/oauth2/authorize?response_type=code&client_id=client1&redirect_uri=http://127.0.0.1:8080/authorized&scope=openid read
    // http://127.0.0.1:8000/oauth2/authorize?response_type=code&client_id=client1&redirect_uri=http://127.0.0.1:8080/authorized&scope=openid read&code_challenge=7KsB5rHCPcsHLxs3eijds83BQHc0yUMku227l516UUE&code_challenge_method=S256
    // code_verifier : m1vPAe8FO_w2GMSIyxr-NtTdAF8e2b_475XMF3Q1pIEWCC1LmaO2LWdzurW-MA46wfZcqkBsqmo257XYgeP-1KXjoElxMl7dHJ-d4iCqouR1QJ4Do40xaT1JKOz8KWe5
    private final CustomAuthenticationProvider customAuthenticationProvider;

    public SpringSecurityConfiguration(CustomAuthenticationProvider customAuthenticationProvider) {
        this.customAuthenticationProvider = customAuthenticationProvider;
    }

    @Bean
    SecurityFilterChain configureSecurityFilterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests.anyRequest().authenticated())
                .formLogin(Customizer.withDefaults());

        return http.build();

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

    @Autowired
    public void bindAuthenticationProvider(AuthenticationManagerBuilder authenticationManagerBuilder) {
        authenticationManagerBuilder
                .authenticationProvider(customAuthenticationProvider);
    }

}