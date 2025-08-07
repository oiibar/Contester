package com.example.tutorial.controllers;

import com.example.tutorial.exceptions.ResourceNotFoundException;
import com.example.tutorial.models.Discussion;
import com.example.tutorial.services.DiscussionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/discussions")
@CrossOrigin(origins = "http://localhost:3000")
public class DiscussionController {
    private final DiscussionService discussionService;

    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @PostMapping("/problem/{problemId}")
    public ResponseEntity<Discussion> addDiscussionToProblem(
            @PathVariable Long problemId,
            @RequestBody Discussion discussion) {
        try {
            return ResponseEntity.ok(discussionService.addDiscussionToProblem(problemId, discussion));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/problem/{problemId}")
    public ResponseEntity<List<Discussion>> getDiscussionsForProblem(@PathVariable Long problemId) {
        try {
            return ResponseEntity.ok(discussionService.getDiscussionsForProblem(problemId));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{discussionId}/reply")
    public ResponseEntity<Discussion> replyToDiscussion(
            @PathVariable Long discussionId,
            @RequestBody Discussion reply) {
        try {
            return ResponseEntity.ok(discussionService.replyToDiscussion(discussionId, reply));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}