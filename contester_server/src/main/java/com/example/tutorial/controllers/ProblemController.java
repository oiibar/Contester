package com.example.tutorial.controllers;

import com.example.tutorial.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import com.example.tutorial.dto.ProblemDto;
import com.example.tutorial.services.ProblemService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path = "/api/v1/problems")
public class ProblemController {
    private final ProblemService problemService;

    @Autowired
    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping()
    public List<ProblemDto> listProblems(Model model) {
        return problemService.findAllProblems();
    }

    @GetMapping(path = "{problemId}")
    public ResponseEntity<ProblemDto> getProblem(@PathVariable("problemId") Long id) {
        ProblemDto problemDto = problemService.getProblem(id);
        return ResponseEntity.ok(problemDto);
    }

    @PostMapping()
    public ProblemDto addProblem(@RequestBody ProblemDto problemDto) {
        return problemService.saveProblem(problemDto);
    }

    @DeleteMapping(path = "{problemId}")
    public ResponseEntity<String> deleteProblem(@PathVariable("problemId") Long id) {
        problemService.deleteProblem(id);
        return ResponseEntity.ok("Problem with ID " + id + " has been deleted successfully.");
    }
}
