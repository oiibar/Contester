package com.example.tutorial.services.impl;

import com.example.tutorial.dto.ContestDto;
import com.example.tutorial.dto.UserDto;
import com.example.tutorial.models.Contest;
import com.example.tutorial.models.User;
import com.example.tutorial.repo.ContestRepository;
import com.example.tutorial.services.ContestService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContestServiceImpl implements ContestService {
    private final ContestRepository contestRepository;

    public ContestServiceImpl(ContestRepository contestRepository) {
        this.contestRepository = contestRepository;
    }

    @Override
    public List<ContestDto> findAllContests() {
        List<Contest> contests = contestRepository.findAll();
        return contests.stream().map(this::mapToContestDto).collect(Collectors.toList());
    }

    @Override
    public void saveContest(Contest contest) {
        contestRepository.save(contest);
    }

    private ContestDto mapToContestDto(Contest contest) {
        return ContestDto.builder()
                .id(contest.getId())
                .title(contest.getTitle())
                .description(contest.getDescription())
                .problems(contest.getProblems())
                .startDate(contest.getStartDate())
                .endDate(contest.getEndDate())
                .createdAt(contest.getCreatedAt())
                .updatedAt(contest.getUpdatedAt())
                .build();
    }
}