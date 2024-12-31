package com.example.tutorial.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class UserDto {
    private Long id;
    @NotEmpty
    @Size(min = 2, max = 50, message = "2 <= username <= 50 chars")
    private String username;
    @Email
    private String email;
    private Integer points;
    @Size(min = 8, message = "password should have at least 8 characters")
    private String password;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
