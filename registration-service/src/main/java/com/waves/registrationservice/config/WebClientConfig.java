package com.waves.registrationservice.config;

import com.waves.registrationservice.client.EmailClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient emailWebClient(){
        return WebClient.builder()
                .baseUrl("http://127.0.0.1:8091")
                .build();
    }

    @Bean
    public EmailClient emailClient(){
        HttpServiceProxyFactory httpServiceProxyFactory = HttpServiceProxyFactory
                .builder(WebClientAdapter.forClient(emailWebClient()))
                .build();
        return httpServiceProxyFactory.createClient(EmailClient.class);
    }

}
