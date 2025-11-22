package com.example.tutorial.services.impl;

import com.example.tutorial.models.Submission;
import com.example.tutorial.repo.SubmissionRepository;
import com.example.tutorial.services.interfaces.SubmissionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SubmissionServiceImpl implements SubmissionService {
    private final SubmissionRepository submissionRepository;

    public SubmissionServiceImpl(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    @Override
    @Transactional
    public Submission submitProblem(Submission submission) {
        return submissionRepository.save(submission);
    }
}
