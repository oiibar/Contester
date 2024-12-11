package com.example.tutorial.services;

import com.example.tutorial.dto.ProblemDto;
import com.example.tutorial.dto.UserDto;

import java.util.List;

public interface ProblemService {
    List<ProblemDto> findAllProblems();
    void deleteProblem(Long id);
    ProblemDto getProblem(Long id);
    ProblemDto saveProblem(ProblemDto problemDto);
}
