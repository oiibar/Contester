package com.example.tutorial.services;

import com.example.tutorial.models.Discussion;
import com.example.tutorial.models.Reply;
import com.example.tutorial.repo.DiscussionRepository;
import com.example.tutorial.repo.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyService {

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private DiscussionRepository discussionRepository;

    public List<Reply> getRepliesByDiscussionId(Long discussionId) {
        return replyRepository.findByDiscussionId(discussionId);
    }

    public Reply createReply(Long discussionId, String userId, String content, Long parentReplyId) {
        Discussion discussion = discussionRepository.findById(discussionId)
                .orElseThrow(() -> new RuntimeException("Discussion not found"));

        Reply parentReply = null;
        if (parentReplyId != null) {
            parentReply = replyRepository.findById(parentReplyId)
                    .orElseThrow(() -> new RuntimeException("Parent reply not found"));
        }

        Reply reply = Reply.builder()
                .discussion(discussion)
                .parentReply(parentReply)
                .userId(userId)
                .content(content)
                .upvotes(0)
                .downvotes(0)
                .build();

        return replyRepository.save(reply);
    }

    public Reply upvoteReply(Long replyId) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("Reply not found"));

        reply.upvote();
        return replyRepository.save(reply);
    }

    public Reply downvoteReply(Long replyId) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("Reply not found"));

        reply.downvote();
        return replyRepository.save(reply);
    }

    public Reply removeUpvoteReply(Long replyId) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("Reply not found"));

        reply.removeUpvote();
        return replyRepository.save(reply);
    }

    public Reply removeDownvoteReply(Long replyId) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("Reply not found"));

        reply.removeDownvote();
        return replyRepository.save(reply);
    }

}
