package com.example.tutorial.models;

import com.example.tutorial.enums.Difficulty;
import com.fasterxml.jackson.annotation.*;
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
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(length = 500)
    private String title;

    @Column()
    private String functionName;

    @Column(length = 1000)
    private String description;

    @Column(length = 2000)
    private String given;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contest_id")
    @JsonBackReference("contest-problems")
    private Contest contest;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL)
    @JsonManagedReference("problem-discussions")
    private List<Discussion> discussions = new ArrayList<>();

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("problem-examples")
    private List<Example> examples = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "problem_hints")
    @Column(name = "hint")
    private List<String> hints = new ArrayList<>();

    @ColumnDefault("100")
    private Double successRate;

    @ColumnDefault("1000")
    private Integer points;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public void addDiscussion(Discussion discussion) {
        discussions.add(discussion);
        discussion.setProblem(this);
    }
}
