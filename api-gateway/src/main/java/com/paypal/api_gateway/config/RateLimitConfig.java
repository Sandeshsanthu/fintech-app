package com.paypal.api_gateway.config;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

@Configuration
public class RateLimiterConfig {

    @Bean
    public KeyResolver ipKeyResolver() {
        return exchange -> {
            String ip = exchange.getRequest()
                .getRemoteAddress()
                .getAddress()
                .getHostAddress();
            return Mono.just(ip);
        };
    }

    @Bean
    public KeyResolver userKeyResolver() {
        return exchange -> {
            // Try to get user from header, fallback to IP
            String userId = exchange.getRequest()
                .getHeaders()
                .getFirst("X-User-Id");
            
            if (userId != null && !userId.isEmpty()) {
                return Mono.just(userId);
            }
            
            // Fallback to IP address
            String ip = exchange.getRequest()
                .getRemoteAddress()
                .getAddress()
                .getHostAddress();
            return Mono.just(ip);
        };
    }
}
