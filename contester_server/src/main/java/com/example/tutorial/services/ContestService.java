package com.example.tutorial.services;

import com.example.tutorial.dto.ContestDto;

import java.util.List;

public interface ContestService {
    List<ContestDto> findAllContests();
    ContestDto saveContest(ContestDto contestDto);
    void deleteContest(Long id);
}
