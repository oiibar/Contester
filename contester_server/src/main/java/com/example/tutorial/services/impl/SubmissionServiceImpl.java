package com.example.tutorial.services.impl;

import com.example.tutorial.models.Contest;
import com.example.tutorial.models.Problem;
import com.example.tutorial.models.Submission;
import com.example.tutorial.models.User;
import com.example.tutorial.repo.ContestRepository;
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
    private final ContestRepository contestRepository;

    public SubmissionServiceImpl(SubmissionRepository submissionRepository, UserRepository userRepository, ProblemRepository problemRepository, ContestRepository contestRepository) {
        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
        this.submissionRepository = submissionRepository;
        this.contestRepository = contestRepository;

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

        if (!user.getProblems().contains(problem)) {
            user.getProblems().add(problem);
            problem.getUsers().add(user);
        }


        Contest contest = contestRepository.findById(problem.getContest().getId())
                .orElseThrow(() -> new IllegalArgumentException("Contest not found with id: " + problem.getContest().getId()));

        boolean contestHasParticipant = contest.getParticipants().stream()
                .anyMatch(u -> u.getId() != null && u.getId().equals(user.getId()));
        if (!contestHasParticipant) {
            contest.getParticipants().add(user);
        }

        int points = problem.getPoints();
        Long userId = user.getId();
        contest.getUserScores().put(userId, contest.getUserScores().getOrDefault(userId, 0) + points);

        userRepository.save(user);
        problemRepository.save(problem);
        contestRepository.save(contest);

        return submissionRepository.save(submission);
    }
}
