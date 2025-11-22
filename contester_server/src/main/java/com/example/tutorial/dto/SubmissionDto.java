package com.example.tutorial.dto;
import com.example.tutorial.models.Result;
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
public class SubmissionDto {
    private Long id;
    private Long userId;
    private Long problemId;
    private String code;
    private String language;
    private List<Result> results;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
