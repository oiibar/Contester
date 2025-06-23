package com.example.tutorial.controllers;

import com.example.tutorial.models.Contest;
import com.example.tutorial.models.User;
import com.example.tutorial.services.ContestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/v1/contests")
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

    @GetMapping("/{id}")
    public ResponseEntity<Contest> getContestById(@PathVariable Long id) {
        return ResponseEntity.ok(contestService.getContestById(id));
    }

    @PutMapping
    public ResponseEntity<Contest> updateContest(@RequestBody Contest contest) {
        return ResponseEntity.ok(contestService.updateContest(contest));
    }

    @PostMapping
    public ResponseEntity<Contest> saveContest(@RequestBody Contest contest) {
        return ResponseEntity.ok(contestService.saveContest(contest));
    }

    @Transactional
    @PostMapping("/{contestId}/register")
    public ResponseEntity<?> registerToContest(@PathVariable Long contestId,
                                               @AuthenticationPrincipal User user) {
        Contest contest = contestService.getContestWithParticipants(contestId);

        boolean alreadyRegistered = contest.getParticipants().stream()
                .anyMatch(p -> p.getId().equals(user.getId()));

        if (alreadyRegistered) {
            return ResponseEntity.ok().body(Map.of("error", "User is already registered for this contest."));
        }

        contest.addParticipant(user);
        contestService.saveContest(contest);

        return ResponseEntity.ok().body(Map.of("message", "Successfully registered."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContest(@PathVariable Long id) {
        contestService.deleteContestById(id);
        return ResponseEntity.noContent().build();
    }
}