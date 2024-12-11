package com.example.tutorial.services.impl;

import com.example.tutorial.dto.ContestDto;
import com.example.tutorial.models.Contest;
import com.example.tutorial.repo.ContestRepository;
import com.example.tutorial.services.ContestService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContestServiceImpl implements ContestService {
    private ContestRepository contestRepository;

    public ContestServiceImpl(ContestRepository contestRepository) {
        this.contestRepository = contestRepository;
    }

    @Override
    public List<ContestDto> findAllContests() {
        List<Contest> contests = contestRepository.findAll();
        return contests.stream().map((contest) -> mapToContestDto(contest)).collect(Collectors.toList());
    }

    @Override
    public ContestDto saveContest(ContestDto contestDto) {
        Contest contest = mapToContestEntity(contestDto);
        Contest savedContest = contestRepository.save(contest);
        return mapToContestDto(savedContest);
    }

    @Override
    public void deleteContest(Long id) {
        if (!contestRepository.existsById(id)) {
            throw new IllegalArgumentException("Contest with ID " + id + " does not exist");
        }
        contestRepository.deleteById(id);
    }

    private ContestDto mapToContestDto(Contest contest) {
        ContestDto contestDto = ContestDto.builder()
                .id(contest.getId())
                .authorID(contest.getAuthorID())
                .title(contest.getTitle())
                .description(contest.getDescription())
                .startDate(contest.getStartDate())
                .endDate(contest.getEndDate())
                .createdAt(contest.getCreatedAt())
                .updatedAt(contest.getUpdatedAt())
                .build();
        return contestDto;
    }

    private Contest mapToContestEntity(ContestDto contest) {
        return Contest.builder()
                .authorID(contest.getAuthorID())
                .title(contest.getTitle())
                .description(contest.getDescription())
                .startDate(contest.getStartDate())
                .endDate(contest.getEndDate())
                .build();
    }
}
