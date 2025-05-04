package com.example.tutorial.auth;

import com.example.tutorial.enums.Role;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

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
    private String country;
    private Integer rating;
    private Role role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
