package com.example.tutorial.controllers;

import com.example.tutorial.models.Discussion;
import com.example.tutorial.services.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/problems/{problemId}/discussions")
public class DiscussionController {

    @Autowired
    private DiscussionService discussionService;

    @GetMapping
    public List<Discussion> getDiscussions(@PathVariable Long problemId) {
        return discussionService.getDiscussionsByProblemId(problemId);
    }

    @PostMapping
    public Discussion createDiscussion(
            @PathVariable Long problemId,
            @RequestParam String userId,
            @RequestParam String content) {
        return discussionService.createDiscussion(problemId, userId, content);
    }

    @PostMapping("/{discussionId}/upvote")
    public Discussion upvoteDiscussion(@PathVariable Long discussionId) {
        return discussionService.upvoteDiscussion(discussionId);
    }

    @PostMapping("/{discussionId}/downvote")
    public Discussion downvoteDiscussion(@PathVariable Long discussionId) {
        return discussionService.downvoteDiscussion(discussionId);
    }

    @PostMapping("/{discussionId}/remove-upvote")
    public Discussion removeUpvoteDiscussion(@PathVariable Long discussionId) {
        return discussionService.removeUpvoteDiscussion(discussionId);
    }

    @PostMapping("/{discussionId}/remove-downvote")
    public Discussion removeDownvoteDiscussion(@PathVariable Long discussionId) {
        return discussionService.removeDownvoteDiscussion(discussionId);
    }
}
