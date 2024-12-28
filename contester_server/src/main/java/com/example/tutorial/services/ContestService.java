package com.example.tutorial.services;

import com.example.tutorial.dto.ContestDto;
import com.example.tutorial.models.Contest;

import java.util.List;

public interface ContestService {
    List<ContestDto> findAllContests();
    void saveContest(Contest contest);

}
