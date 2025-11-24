package com.example.tutorial.services.impl;

import com.example.tutorial.models.Problem;
import com.example.tutorial.models.Submission;
import com.example.tutorial.models.User;
import com.example.tutorial.repo.ProblemRepository;
import com.example.tutorial.repo.SubmissionRepository;
import com.example.tutorial.repo.UserRepository;
import com.example.tutorial.services.interfaces.SubmissionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SubmissionServiceImpl implements SubmissionService {
    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;

    public SubmissionServiceImpl(SubmissionRepository submissionRepository, UserRepository userRepository, ProblemRepository problemRepository) {
        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
        this.submissionRepository = submissionRepository;

    }

    @Override
    @Transactional
    public Submission submitProblem(Submission submission) {
        User user = userRepository.findById(submission.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + submission.getUserId()));
        Problem problem = problemRepository.findById(submission.getProblemId())
                .orElseThrow(() -> new IllegalArgumentException("Problem not found with id: " + submission.getProblemId()));

        boolean userHasProblem = user.getProblems().stream()
                .anyMatch(p -> p.getId() != null && p.getId().equals(problem.getId()));
        if (!userHasProblem) {
            user.getProblems().add(problem);
        }

        boolean problemHasUser = problem.getUsers().stream()
                .anyMatch(u -> u.getId() != null && u.getId().equals(user.getId()));
        if (!problemHasUser) {
            problem.getUsers().add(user);
        }

        userRepository.save(user);

        return submissionRepository.save(submission);
    }
}
