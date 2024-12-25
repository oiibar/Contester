package com.example.tutorial.controllers;

import com.example.tutorial.models.Reply;
import com.example.tutorial.services.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/discussions/{discussionId}/replies")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @GetMapping
    public List<Reply> getReplies(@PathVariable Long discussionId) {
        return replyService.getRepliesByDiscussionId(discussionId);
    }

    @PostMapping
    public Reply createReply(
            @PathVariable Long discussionId,
            @RequestParam String userId,
            @RequestParam String content,
            @RequestParam(required = false) Long parentReplyId) {
        return replyService.createReply(discussionId, userId, content, parentReplyId);
    }

    @PostMapping("/{replyId}/upvote")
    public Reply upvoteReply(@PathVariable Long replyId) {
        return replyService.upvoteReply(replyId);
    }

    @PostMapping("/{replyId}/downvote")
    public Reply downvoteReply(@PathVariable Long replyId) {
        return replyService.downvoteReply(replyId);
    }

    @PostMapping("/{replyId}/remove-upvote")
    public Reply removeUpvoteReply(@PathVariable Long replyId) {
        return replyService.removeUpvoteReply(replyId);
    }

    @PostMapping("/{replyId}/remove-downvote")
    public Reply removeDownvoteReply(@PathVariable Long replyId) {
        return replyService.removeDownvoteReply(replyId);
    }
}
