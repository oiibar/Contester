package com.example.tutorial.dto;

import com.example.tutorial.enums.Difficulty;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class ProblemDto {
    private Long id;
    private String contestID;
    private String title;
    private String description;
    private Difficulty difficulty;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
