package com.waves.authorizationserver.service;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final CustomUserServiceDetails customUserServiceDetails;

    private final PasswordEncoder passwordEncoder;

    public CustomAuthenticationProvider(CustomUserServiceDetails customUserServiceDetails,
                                        PasswordEncoder passwordEncoder) {
        this.customUserServiceDetails = customUserServiceDetails;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String userName = authentication.getName();
        String password = authentication.getCredentials().toString();
        UserDetails user = customUserServiceDetails.loadUserByUsername(userName);
        return checkPassword(user,password);
    }

    private Authentication checkPassword(UserDetails user, String rawPassword) {
        if(passwordEncoder.matches(rawPassword,user.getPassword())){
            return new UsernamePasswordAuthenticationToken(
                    user.getUsername(),
                    user.getPassword(),
                    user.getAuthorities()
            );
        }
        else {
            throw new BadCredentialsException("Wrong Password");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
