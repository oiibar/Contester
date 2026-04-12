package com.example.tutorial.repo;

import com.example.tutorial.models.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
    List<Discussion> findByProblemId(Long problemId);
    List<Discussion> findByProblemIdAndParentDiscussionIsNull(Long problemId);

}


