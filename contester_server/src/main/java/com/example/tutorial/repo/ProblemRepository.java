package com.example.tutorial.repo;

import com.example.tutorial.models.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
    Optional<Problem> findByTitle(String url);
}
