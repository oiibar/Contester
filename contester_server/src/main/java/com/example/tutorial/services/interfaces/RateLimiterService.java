package com.example.tutorial.services.interfaces;

public interface RateLimiterService {
    boolean tryConsume(String userId);
}