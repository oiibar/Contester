package com.example.tutorial.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import com.example.tutorial.dto.ContestDto;
import com.example.tutorial.services.ContestService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path = "/api/v1/contests")
public class ContestController {
    private final ContestService contestService;

    @Autowired
    public ContestController(ContestService contestService) {
        this.contestService = contestService;
    }

    @GetMapping()
    @ResponseStatus(code = HttpStatus.OK)
    public List<ContestDto> listContests(Model model) {
        return contestService.findAllContests();
    }

    @DeleteMapping(path = "{contestId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<String> deleteContest(@PathVariable("contestId") Long id) {
        contestService.deleteContest(id);
        return ResponseEntity.ok("User with ID " + id + " has been deleted successfully.");
    }

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public ContestDto addContest(@RequestBody ContestDto contestDto) {
        return contestService.saveContest(contestDto);
    }


}
