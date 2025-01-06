package com.example.tutorial.services;

import com.example.tutorial.models.Contest;
import java.util.List;

public interface ContestService {
    List<Contest> findAllContests();
    Contest saveContest(Contest contest);
}