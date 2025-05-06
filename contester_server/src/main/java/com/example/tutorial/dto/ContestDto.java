package com.example.tutorial.dto;

import com.example.tutorial.enums.Status;
import com.example.tutorial.models.Problem;
import com.example.tutorial.models.User;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
public class ContestDto {
    private Long id;
    private String title;
    private String description;
    private Set<User> participants;
    private List<Problem> problems;
    private Status status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

