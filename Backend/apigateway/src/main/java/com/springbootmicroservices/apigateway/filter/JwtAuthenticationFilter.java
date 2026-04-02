package com.springbootmicroservices.apigateway.filter;

import com.springbootmicroservices.apigateway.client.UserServiceClient;
import com.springbootmicroservices.apigateway.model.Token;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.List;

@Component
@Slf4j
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    // ✅ AntPathMatcher correctly handles /** wildcards
    private static final AntPathMatcher pathMatcher = new AntPathMatcher();

    public static class Config {
        private List<String> publicEndpoints;

        public List<String> getPublicEndpoints() {
            return publicEndpoints;
        }

        public Config setPublicEndpoints(List<String> publicEndpoints) {
            this.publicEndpoints = publicEndpoints;
            return this;
        }
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getURI().getPath();
            log.info("Incoming request path: {}", path);

            // ✅ Use AntPathMatcher so /api/v1/authentication/** actually matches
            if (config != null && config.getPublicEndpoints() != null) {
                boolean isPublic = config.getPublicEndpoints().stream()
                    .anyMatch(endpoint -> pathMatcher.match(endpoint, path));

                if (isPublic) {
                    log.info("Path {} is public, skipping JWT filter", path);
                    return chain.filter(exchange);
                }
            }

            String authorizationHeader = exchange.getRequest().getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

            if (Token.isBearerToken(authorizationHeader)) {
                String jwt = Token.getJwt(authorizationHeader);

                ApplicationContext context = exchange.getApplicationContext();
                UserServiceClient userServiceClient = context.getBean(UserServiceClient.class);

                return Mono.fromCallable(() -> {
                            userServiceClient.validateToken(jwt);
                            log.debug("Token validation succeeded for path: {}", path);
                            return true;
                        })
                        .subscribeOn(Schedulers.boundedElastic())
                        .flatMap(valid -> chain.filter(exchange))
                        .onErrorResume(e -> {
                            log.error("Token validation failed for path: {}", path, e);
                            if (e instanceof FeignException.Unauthorized
                                    || e instanceof FeignException.Forbidden) {
                                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                            } else {
                                exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
                            }
                            return exchange.getResponse().setComplete();
                        });
            }

            // ✅ If no token and not a public endpoint — return 401 instead of passing through
            log.warn("Missing or invalid Authorization header for path: {}", path);
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        };
    }
}