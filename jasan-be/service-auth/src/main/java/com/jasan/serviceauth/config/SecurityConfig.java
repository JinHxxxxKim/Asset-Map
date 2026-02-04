package com.jasan.serviceauth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // '단방향 해시'
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // (임시)허용할 IP 주소 (Gateway IP)
        String gatewayIpAddress = "hasIpAddress('127.0.0.1') or hasIpAddress('::1')";

        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/**").access(
                                    new WebExpressionAuthorizationManager(gatewayIpAddress)
                            )
                            .anyRequest().authenticated()
            );
        return http.build();
    }
}
