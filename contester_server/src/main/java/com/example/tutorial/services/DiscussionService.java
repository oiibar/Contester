package com.example.tutorial.services;

import com.example.tutorial.models.Discussion;
import com.example.tutorial.models.Problem;
import com.example.tutorial.repo.DiscussionRepository;
import com.example.tutorial.repo.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscussionService {

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private ProblemRepository problemRepository;

    public List<Discussion> getDiscussionsByProblemId(Long problemId) {
        return discussionRepository.findByProblemId(problemId);
    }

    public Discussion createDiscussion(Long problemId, String userId, String content) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        Discussion discussion = Discussion.builder()
                .problem(problem)
                .userId(userId)
                .content(content)
                .upvotes(0)
                .downvotes(0)
                .build();

        return discussionRepository.save(discussion);
    }

    public Discussion upvoteDiscussion(Long discussionId) {
        Discussion discussion = discussionRepository.findById(discussionId)
                .orElseThrow(() -> new RuntimeException("Discussion not found"));

        discussion.upvote();
        return discussionRepository.save(discussion);
    }

    public Discussion downvoteDiscussion(Long discussionId) {
        Discussion discussion = discussionRepository.findById(discussionId)
                .orElseThrow(() -> new RuntimeException("Discussion not found"));

        discussion.downvote();
        return discussionRepository.save(discussion);
    }

    public Discussion removeUpvoteDiscussion(Long discussionId) {
        Discussion discussion = discussionRepository.findById(discussionId)
                .orElseThrow(() -> new RuntimeException("Discussion not found"));

        discussion.removeUpvote();
        return discussionRepository.save(discussion);
    }

    public Discussion removeDownvoteDiscussion(Long discussionId) {
        Discussion discussion = discussionRepository.findById(discussionId)
                .orElseThrow(() -> new RuntimeException("Discussion not found"));

        discussion.removeDownvote();
        return discussionRepository.save(discussion);
    }

}
