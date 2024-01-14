package com.waves.userservice.services;

import com.waves.userservice.model.User;
import com.waves.userservice.model.UserRegisterDto;
import com.waves.userservice.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserByEmailId(String emailId){
        return userRepository.findByEmailId(emailId);
    }

    public User registerUser(UserRegisterDto userRegisterDto) {

        User newUser = new User();
        newUser.setRole("USER");
        newUser.setPassword(passwordEncoder().encode(userRegisterDto.getPassword()));
        newUser.setEmailId(userRegisterDto.getEmailId());
        newUser.setFullName(userRegisterDto.getFullName());
        //send welcome mail!
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
