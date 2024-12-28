package com.example.tutorial.dto;

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
    private String description;
    private String given;
    private String difficulty;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ExampleDto> examples;

}
