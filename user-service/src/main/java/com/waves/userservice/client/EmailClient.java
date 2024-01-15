package com.waves.userservice.client;

import com.waves.userservice.model.EmailDto;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;

@HttpExchange
public interface EmailClient {

    @PostExchange("/email-service/sendMail")
    public void sendEmail(@RequestBody EmailDto emailDto);

}
