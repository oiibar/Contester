package com.example.tutorial.dto;

import com.example.tutorial.enums.Difficulty;
import com.example.tutorial.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProblemDto {
    private Long id;
    private String title;
    private String functionName;
    private String description;
    private String given;
//    private Double successRate;
    private Integer points;
    private Difficulty difficulty;
    private List<ExampleDto> examples;
    private List<String> hints;
    private List<User> users;
    private Long contestId;
    private List<DiscussionDto> discussions;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
