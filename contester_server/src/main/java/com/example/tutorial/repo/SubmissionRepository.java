package com.example.tutorial.repo;

import com.example.tutorial.models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserIdAndProblemId(Long userId, Long problemId);
}

