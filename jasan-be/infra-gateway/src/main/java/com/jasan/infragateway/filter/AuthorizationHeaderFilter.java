package com.jasan.infragateway.filter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.security.Key;

@Slf4j
@Component
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

    private final Key key;

    public AuthorizationHeaderFilter(@Value("${jwt.secret}") String secretKey) {
        super(Config.class);
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public static class Config {
    }

    // Filter
    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            // 1. 헤더 토큰 검증
            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return onError(exchange, "No authorization header", HttpStatus.UNAUTHORIZED);
            }

            // 2. 토큰 추출
            String authorizationHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            String jwt = authorizationHeader.replace("Bearer ", "");

            // 3. 토큰 유효성 검사
            if (!isJwtValid(jwt)) {
                return onError(exchange, "JWT token is not valid", HttpStatus.UNAUTHORIZED);
            }

            // 4. 검증 성공
            return chain.filter(exchange);
        };
    }

    // 토큰 검증
    private boolean isJwtValid(String jwt) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // 에러 반환(Web Flux)
    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);
        return response.setComplete();
    }
}