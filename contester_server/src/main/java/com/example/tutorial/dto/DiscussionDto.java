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
public class DiscussionDto {
    private Long id;
    private String username;
    private String message;
    private Long upvotes;
    private Long parentDiscussion;
    private List<DiscussionDto> replies;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
