package com.example.tutorial.services.interfaces;

import com.example.tutorial.models.Contest;
import java.util.List;

public interface ContestService {
    List<Contest> findAllContests();
    Contest saveContest(Contest contest);
    void deleteContestById(Long id);
    Contest updateContest(Contest contest);
    Contest getContestById(Long id);
    Contest getContestWithParticipants(Long contestId);
}