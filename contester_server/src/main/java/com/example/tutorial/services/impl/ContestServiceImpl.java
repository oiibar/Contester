package com.example.tutorial.services.impl;

import com.example.tutorial.models.Contest;
import com.example.tutorial.models.Problem;
import com.example.tutorial.repo.ContestRepository;
import com.example.tutorial.repo.ProblemRepository;
import com.example.tutorial.services.ContestService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContestServiceImpl implements ContestService {
    private final ContestRepository contestRepository;
    private final ProblemRepository problemRepository;

    public ContestServiceImpl(ContestRepository contestRepository,
                              ProblemRepository problemRepository) {
        this.contestRepository = contestRepository;
        this.problemRepository = problemRepository;
    }

    @Override
    public List<Contest> findAllContests() {
        return contestRepository.findAll();
    }

    @Override
    @Transactional
    public Contest saveContest(Contest contest) {
        Contest savedContest = contestRepository.save(contest);

        if (contest.getProblems() != null) {
            contest.getProblems().forEach(problem -> {
                problem.setContest(savedContest);
            });
            problemRepository.saveAll(contest.getProblems());
        }

        return savedContest;
    }
}