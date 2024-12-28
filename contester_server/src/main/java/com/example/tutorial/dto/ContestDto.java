package com.example.tutorial.dto;

import com.example.tutorial.models.Problem;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ContestDto {
    private Long id;
    private String title;
    private String description;
    private List<Problem> problems;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

