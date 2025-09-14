package com.example.tutorial.controllers;
import com.example.tutorial.services.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/execute")
public class SubmissionController {
    private final ApiService apiService;

    @Autowired
    public SubmissionController(ApiService apiService) {
        this.apiService = apiService;
    }

    private String clientId = "1d286c424ad067c1f3ad915968f1e092";
    private String clientSecret = "eb50e3393380c971c5da388e2531886855e4960f3c0c6fc13674a6f169bac200";

    @PostMapping()
    public Mono<String> executeCode(@RequestBody Map<String, Object> request) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("clientId", clientId);
        payload.put("clientSecret", clientSecret);
        payload.put("script", request.get("script"));
        payload.put("stdin", request.getOrDefault("stdin", ""));
        payload.put("language", request.get("language"));
        payload.put("versionIndex", request.get("versionIndex"));
        payload.put("compileOnly", request.getOrDefault("compileOnly", false));

        return apiService.executeCode(payload);
    }

//    @PostMapping()
//    public ResponseEntity<?> submitProblem() {
//        return ResponseEntity.ok().body(Map.of("message", "Successfully submitted a problem."));
//    }
}
