package com.example.tutorial.services.impl;

import com.example.tutorial.models.Contest;
import com.example.tutorial.repo.ContestRepository;
import com.example.tutorial.repo.ProblemRepository;
import com.example.tutorial.services.interfaces.ContestService;
import jakarta.persistence.EntityNotFoundException;
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
    public Contest updateContest(Contest contest) {
        return contestRepository.save(contest);
    }

    @Override
    public List<Contest> findAllContests() {
        return contestRepository.findAll();
    }

    @Override
    public void deleteContestById(Long id) {
        contestRepository.deleteById(id);
    }

    @Override
    public Contest getContestById(Long id) {
        return contestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contest not found with id: " + id));
    }

    @Override
    public Contest getContestWithParticipants(Long contestId) {
        return contestRepository.findByIdWithParticipants(contestId)
                .orElseThrow(() -> new EntityNotFoundException("Contest not found"));
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