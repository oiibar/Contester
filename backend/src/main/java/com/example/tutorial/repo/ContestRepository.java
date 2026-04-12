package com.example.tutorial.repo;

import com.example.tutorial.models.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ContestRepository extends JpaRepository<Contest, Long> {
    @Query("SELECT c FROM Contest c LEFT JOIN FETCH c.participants WHERE c.id = :id")
    Optional<Contest> findByIdWithParticipants(@Param("id") Long id);
}
