package com.example.tutorial.auth;

import com.example.tutorial.enums.Role;
import com.example.tutorial.models.Contest;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private Integer problemsSolved;
    private String email;
    private String bio;
    private List<Contest> contests;
    private String country;
    private Integer rating;
    private Role role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
