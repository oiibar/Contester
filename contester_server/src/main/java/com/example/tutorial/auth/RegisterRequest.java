package com.example.tutorial.auth;

import com.example.tutorial.enums.Role;
import com.example.tutorial.models.Contest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;

    private String firstName;
    private String lastName;
    private String bio = "About me";
    private Integer problemsSolved = 0;
    private Integer rating = 0;
    private String country = "---";
    private List<Contest> contests = new ArrayList<>();

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    private Role role;
}
