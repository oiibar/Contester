package com.example.tutorial.models;

import com.example.tutorial.enums.Status;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contest {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String title;
    private String description;
    private Status status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    @ColumnDefault("0")
    private Integer participants;

    @OneToMany(mappedBy = "contest", cascade = CascadeType.ALL)
    @JsonManagedReference("contest-problems")
    private List<Problem> problems = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public void addProblem(Problem problem) {
        problems.add(problem);
        problem.setContest(this);
    }
}