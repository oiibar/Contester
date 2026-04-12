package com.example.tutorial.services.impl;
import com.example.tutorial.services.interfaces.RateLimiterService;
import io.github.bucket4j.*;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimiterServiceImpl implements RateLimiterService {
    private final ConcurrentHashMap<String, Bucket> userBuckets = new ConcurrentHashMap<>();

    @Override
    public boolean tryConsume(String userId) {
        Bucket bucket = userBuckets.computeIfAbsent(userId, id -> {
            Bandwidth limit = Bandwidth.classic(5, Refill.greedy(5, Duration.ofMinutes(1)));
            return Bucket.builder().addLimit(limit).build();
        });

        return bucket.tryConsume(1);
    }
}

