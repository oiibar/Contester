package com.example.tutorial.services;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.time.Duration;
import java.util.Map;

@Service
public class ApiService {
    private final WebClient webClient;
    private final Bucket bucket;

    public ApiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.jdoodle.com/v1").build();

        Bandwidth limit = Bandwidth.classic(5, Refill.greedy(10, Duration.ofMinutes(1)));
        this.bucket = Bucket.builder().addLimit(limit).build();
    }

    public Mono<String> executeCode(Map<String, Object> payload) {
        if (bucket.tryConsume(1)) {
            return webClient.post()
                    .uri("/execute")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(payload)
                    .retrieve()
                    .bodyToMono(String.class);
        } else {
            return Mono.error(new RuntimeException("Rate limit exceeded. Try again later."));
        }
    }
}
