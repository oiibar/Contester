package com.example.tutorial.controllers;

import com.example.tutorial.models.Contest;
import com.example.tutorial.services.ContestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contests")
@CrossOrigin(origins = "http://localhost:3000")
public class ContestController {
    private final ContestService contestService;

    public ContestController(ContestService contestService) {
        this.contestService = contestService;
    }

    @GetMapping
    public ResponseEntity<List<Contest>> listContests() {
        return ResponseEntity.ok(contestService.findAllContests());
    }

    @PutMapping
    public ResponseEntity<Contest> updateContest(@RequestBody Contest contest) {
        return ResponseEntity.ok(contestService.updateContest(contest));
    }

    @PostMapping
    public ResponseEntity<Contest> saveContest(@RequestBody Contest contest) {
        return ResponseEntity.ok(contestService.saveContest(contest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContest(@PathVariable Long id) {
        contestService.deleteContestById(id);
        return ResponseEntity.noContent().build();
    }
}