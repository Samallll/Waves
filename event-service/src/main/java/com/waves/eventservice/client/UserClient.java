package com.waves.eventservice.client;

import com.waves.eventservice.model.Dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

@HttpExchange
public interface UserClient {

    @GetExchange("/api/v1/user/{userId}")
    public ResponseEntity<UserDto> getUserDetails(@PathVariable Long userId);

}
