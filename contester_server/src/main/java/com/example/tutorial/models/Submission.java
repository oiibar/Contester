package com.example.tutorial.models;

import com.example.tutorial.models.Problem;
import com.example.tutorial.models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    private String sourceCode;

    private String language;

    private String status; // Passed, Failed, Runtime Error, etc.

    private String stdout;

    private String stderr;

    private Double executionTime;

    private Double memoryUsage;

    @CreationTimestamp
    private LocalDateTime submittedAt;
}
