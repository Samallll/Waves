package com.waves.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.oidc.web.server.logout.OidcClientInitiatedServerLogoutSuccessHandler;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestCustomizers;
import org.springframework.security.oauth2.client.web.server.DefaultServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.server.ServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;
import org.springframework.web.server.WebFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    private final ReactiveClientRegistrationRepository repository;

    public SecurityConfig(ReactiveClientRegistrationRepository repository) {
        this.repository = repository;
    }

    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http,
                                                     ServerOAuth2AuthorizationRequestResolver pkceResolver) throws Exception {

        return http
                    .authorizeExchange(exchange -> exchange
                            .pathMatchers("/**").permitAll()
                            .anyExchange().authenticated())
                    .csrf(ServerHttpSecurity.CsrfSpec::disable)
                    .oauth2Login(auth -> auth
                            .authorizationRequestResolver(pkceResolver))
                    .oauth2Client(withDefaults())
                    .logout(logout -> logout
                            .logoutUrl("/logout")
                            .logoutSuccessHandler(logoutSuccessHandler(repository)))
//                    .exceptionHandling(exceptions -> exceptions
//                            .authenticationEntryPoint(entryPoint))
                    .build();
        }

        @Bean
        ServerLogoutSuccessHandler logoutSuccessHandler(ReactiveClientRegistrationRepository repository) {
            OidcClientInitiatedServerLogoutSuccessHandler oidcLogoutSuccessHandler = new OidcClientInitiatedServerLogoutSuccessHandler(repository);
            oidcLogoutSuccessHandler.setPostLogoutRedirectUri("{baseUrl}/logged-out");
            return oidcLogoutSuccessHandler;
        }

    @Bean
    ServerOAuth2AuthorizationRequestResolver pkceResolver(ReactiveClientRegistrationRepository repo) {
        var resolver = new DefaultServerOAuth2AuthorizationRequestResolver(repo);
        resolver.setAuthorizationRequestCustomizer(OAuth2AuthorizationRequestCustomizers.withPkce());
        return resolver;
    }

}