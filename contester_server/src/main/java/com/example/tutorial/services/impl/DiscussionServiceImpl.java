package com.example.tutorial.services.impl;

import com.example.tutorial.exceptions.ResourceNotFoundException;
import com.example.tutorial.models.Discussion;
import com.example.tutorial.models.Problem;
import com.example.tutorial.repo.DiscussionRepository;
import com.example.tutorial.repo.ProblemRepository;
import com.example.tutorial.services.interfaces.DiscussionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class DiscussionServiceImpl implements DiscussionService {
    private final DiscussionRepository discussionRepository;
    private final ProblemRepository problemRepository;

    public DiscussionServiceImpl(DiscussionRepository discussionRepository,
                                 ProblemRepository problemRepository) {
        this.discussionRepository = discussionRepository;
        this.problemRepository = problemRepository;
    }

    @Override
    public Discussion addDiscussionToProblem(Long problemId, Discussion discussion) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new ResourceNotFoundException("Problem not found with id: " + problemId));

        discussion.setProblem(problem);
        discussion.setCreatedAt(LocalDateTime.now());

        return discussionRepository.save(discussion);
    }

    @Override
    public List<Discussion> getDiscussionsForProblem(Long problemId) {
        if (!problemRepository.existsById(problemId)) {
            throw new ResourceNotFoundException("Problem not found with id: " + problemId);
        }
        return discussionRepository.findByProblemIdAndParentDiscussionIsNull(problemId);

    }

    @Override
    public Discussion replyToDiscussion(Long discussionId, Discussion reply) {
        Discussion parentDiscussion = discussionRepository.findById(discussionId)
                .orElseThrow(() -> new ResourceNotFoundException("Discussion not found with id: " + discussionId));

        if (parentDiscussion.getParentDiscussion() != null) {
            throw new IllegalArgumentException("Cannot reply to a reply");
        }

        reply.setParentDiscussion(parentDiscussion);
        reply.setProblem(parentDiscussion.getProblem());
        reply.setCreatedAt(LocalDateTime.now());

        return discussionRepository.save(reply);
    }
}