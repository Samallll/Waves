package com.waves.eventservice.config;

import com.waves.eventservice.client.UserClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancedExchangeFilterFunction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class WebClientConfig {

    private final LoadBalancedExchangeFilterFunction filterFunction;

    public WebClientConfig(LoadBalancedExchangeFilterFunction filterFunction) {
        this.filterFunction = filterFunction;
    }


    @Bean
    public WebClient employeeWebClient() {
        return WebClient.builder()
                .baseUrl("http://user-service")
                .filter(filterFunction)
                .build();
    }

    @Bean
    public UserClient employeeClient() {
        HttpServiceProxyFactory httpServiceProxyFactory
                = HttpServiceProxyFactory
                .builder(WebClientAdapter.forClient(employeeWebClient()))
                .build();
        return httpServiceProxyFactory.createClient(UserClient.class);
    }
}
