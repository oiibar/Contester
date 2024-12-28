package com.example.tutorial.controllers;

import com.example.tutorial.dto.ContestDto;
import com.example.tutorial.models.Contest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.tutorial.services.ContestService;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/contests")
public class ContestController {
    private final ContestService contestService;

    public ContestController(ContestService contestService) {
        this.contestService = contestService;
    }

    @GetMapping
    public ResponseEntity<List<ContestDto>> listContests() {
        List<ContestDto> contests = contestService.findAllContests();
        return ResponseEntity.ok(contests);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> saveContestWithProblems(@RequestBody ContestDto contestDto) {
        Map<String, Object> response = new LinkedHashMap<>();
        contestService.saveContest(mapToContestEntity(contestDto));
        response.put("status", 1);
        response.put("message", "Contest created successfully!");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    private Contest mapToContestEntity(ContestDto contestDto) {
        Contest contest = new Contest();
        contest.setTitle(contestDto.getTitle());
        contest.setDescription(contestDto.getDescription());
        contest.setStartDate(contestDto.getStartDate());
        contest.setEndDate(contestDto.getEndDate());
        if (contestDto.getProblems() != null) {
            contest.setProblems(contestDto.getProblems());
            contest.getProblems().forEach(problem -> problem.setContest(contest));
        }
        return contest;
    }
}



