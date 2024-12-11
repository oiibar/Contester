package com.example.tutorial.services.impl;

import com.example.tutorial.dto.ProblemDto;
import com.example.tutorial.dto.UserDto;
import com.example.tutorial.models.Problem;
import com.example.tutorial.models.User;
import com.example.tutorial.repo.ProblemRepository;
import com.example.tutorial.services.ProblemService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProblemServiceImpl implements ProblemService {
    private ProblemRepository problemRepository;

    public ProblemServiceImpl(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    @Override
    public List<ProblemDto> findAllProblems() {
        List<Problem> problems = problemRepository.findAll();
        return problems.stream().map(this::mapToProblemDto).collect(Collectors.toList());
    }

    @Override
    public ProblemDto saveProblem(ProblemDto problemDto) {
        Problem problem = mapToUserEntity(problemDto);
        Problem savedProblem = problemRepository.save(problem);
        return mapToProblemDto(savedProblem);
    }

    @Override
    public ProblemDto getProblem(Long id) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Problem with ID " + id + " does not exist"));
        return mapToProblemDto(problem);
    }

    @Override
    public void deleteProblem(Long id) {
        if (!problemRepository.existsById(id)) {
            throw new IllegalArgumentException("Problem with ID " + id + " does not exist");
        }
        problemRepository.deleteById(id);
    }

    private ProblemDto mapToProblemDto(Problem problem) {
        return ProblemDto.builder()
                .id(problem.getId())
                .contestID(problem.getContestID())
                .title(problem.getTitle())
                .description(problem.getDescription())
                .difficulty(problem.getDifficulty())
                .createdAt(problem.getCreatedAt())
                .updatedAt(problem.getUpdatedAt())
                .build();
    }

    private Problem mapToUserEntity(ProblemDto problemDto) {
        return Problem.builder()
                .contestID(problemDto.getContestID())
                .title(problemDto.getTitle())
                .description(problemDto.getDescription())
                .difficulty(problemDto.getDifficulty())
                .build();
    }
}
