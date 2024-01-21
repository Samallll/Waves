package com.waves.apigateway.config;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.event.LogoutSuccessEvent;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.server.ServerAuthenticationEntryPoint;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.net.URI;

public class RedirectServerAuthenticationEntryPoint implements ServerAuthenticationEntryPoint{

    private final WebFilterChain chain;

    public RedirectServerAuthenticationEntryPoint(WebFilterChain chain) {
        this.chain = chain;
    }

    @Override
    public Mono<Void> commence(ServerWebExchange exchange, AuthenticationException ex) {
        if (!LogoutSuccessEvent.class.isAssignableFrom(ex.getClass())) {
            // Proceed with redirection for other authentication exceptions
            return Mono.fromRunnable(() -> exchange.getResponse().setStatusCode(HttpStatus.FOUND))
                    .then(Mono.fromRunnable(() -> exchange.getResponse().getHeaders().setLocation(URI.create("http://127.0.0.1:8090/oauth2/authorization/gateway"))))
                    .then(Mono.fromRunnable(exchange.getResponse()::setComplete));
        } else {
            // Proceed with default behavior for logout
            return chain.filter(exchange);
        }
    }
}
