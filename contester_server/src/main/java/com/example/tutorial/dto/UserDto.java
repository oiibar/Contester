package com.example.tutorial.dto;

import com.example.tutorial.models.Contest;
import com.example.tutorial.models.Problem;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
public class UserDto {
    private Long id;
    @Size(min = 2, max = 50, message = "2 <= username <= 50 chars")
    private String username;
    private String firstName;
    private String lastName;
    private Integer problemsSolved;
    @Email
    private String email;
    private int rating;
    private String country;
    private List<Contest> contests;
    private List<Problem> problems;
    private String bio;
    @Size(min = 8, message = "password should have at least 8 characters")
    private String password;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
