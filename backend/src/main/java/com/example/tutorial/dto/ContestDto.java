package com.example.tutorial.dto;

import com.example.tutorial.enums.Status;
import com.example.tutorial.models.Problem;
import com.example.tutorial.models.User;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Data
@Builder
public class ContestDto {
    private Long id;
    private String title;
    private String description;
    private List<User> participants;
    private Map<Long, Integer> userScores;
    private List<Problem> problems;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

