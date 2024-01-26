package com.waves.userservice.services;

import com.waves.userservice.model.User;
import com.waves.userservice.model.UserDto;
import com.waves.userservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean lockUser(Long userId){

        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            User editUser = user.get();
            editUser.setLocked(true);
            userRepository.save(editUser);
            return true;
        }
        return false;
    }

    public boolean unlockUser(Long userId){

        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            User editUser = user.get();
            editUser.setLocked(false);
            userRepository.save(editUser);
            return true;
        }
        return false;
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

    public List<UserDto> getAllUsersWithDetails() {

        return userRepository.findAll()
                .stream()
                .filter(user -> !"ADMIN".equals(user.getRole()))
                .map(user -> new UserDto(
                        user.getUserId(),
                        user.getFullName(),
                        user.getRole(),
                        user.getEmailId(),
                        user.isLocked(),
                        user.getPhoneNumber()
                ))
                .toList();
    }

    public Optional<UserDto> getUserDtoDetails(Long userId) {

        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            UserDto userDto = userToUserDtoMapper(user.get());
            log.debug("UserService : User Mapped to UserDto");
            return Optional.of(userDto);
        }
        log.error("User not found");
        return Optional.empty();
    }

    public Optional<User> getUserDetails(Long userId) {
        return userRepository.findById(userId);
    }

    private static UserDto userToUserDtoMapper(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setLocked(user.isLocked());
        userDto.setRole(user.getRole());
        userDto.setEmailId(user.getEmailId());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setFullName(user.getFullName());
        return userDto;
    }

    public Optional<UserDto> getuserDetailsByEmail(String email) {

        Optional<User> user = userRepository.findByEmailId(email);
        if(user.isPresent()){
            UserDto userDto = userToUserDtoMapper(user.get());
            log.debug("UserService : User Mapped to UserDto");
            return Optional.of(userDto);
        }
        log.error("User not found");
        return Optional.empty();
    }

    public boolean updateUser(UserDto userDto) {

        Optional<User> user = userRepository.findById(userDto.getUserId());
        if(user.isPresent()){
            user.get().setLocked(userDto.isLocked());
            user.get().setRole(userDto.getRole());
            user.get().setPhoneNumber(userDto.getPhoneNumber());
            user.get().setFullName(userDto.getFullName());
            user.get().setEmailId(userDto.getEmailId());
            userRepository.save(user.get());
            log.trace("User data updated successfully");
            return true;
        }
        log.debug("User data not found");
        return false;
    }
}
