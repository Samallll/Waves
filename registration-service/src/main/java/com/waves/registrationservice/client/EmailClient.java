package com.waves.registrationservice.client;


import com.waves.registrationservice.model.EmailDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;

@HttpExchange
public interface EmailClient {

    @PostExchange("/api/v1/email/sendMail")
    public void sendEmail(@RequestBody EmailDto emailDto);

    @GetExchange("/api/v1/email/hello")
    public ResponseEntity<String> testing();

}
