package com.example.tutorial.models;

import com.example.tutorial.enums.Difficulty;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Problem {
    @Id
    @SequenceGenerator(
            name = "problem_sequence",
            sequenceName = "problem_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "problem_sequence"
    )
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contest_id", referencedColumnName = "id")
    @JsonBackReference
    @JsonIgnore
    private Contest contest;

    @Column(length = 500)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(length = 2000)
    private String given;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ElementCollection
    @CollectionTable(name = "problem_examples", joinColumns = @JoinColumn(name = "problem_id"))
    @Column(name = "example")
    private List<String> examples;

    @ElementCollection
    @CollectionTable(name = "problem_hints", joinColumns = @JoinColumn(name = "problem_id"))
    @Column(name = "hints")
    private List<String> hints;
}
