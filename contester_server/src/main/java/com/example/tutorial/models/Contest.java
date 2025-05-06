package com.example.tutorial.models;

import com.example.tutorial.dto.UserDto;
import com.example.tutorial.enums.Status;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contest {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String title;
    private String description;
    private Status status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;



    // PARTICIPANTS
    @ManyToMany
    @JoinTable(
            name = "contest_participants",
            joinColumns = @JoinColumn(name = "contest_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> participants = new ArrayList<>();

    public void addParticipant(User user) {
        participants.add(user);
//        user.getContests().add(this);
    }



    @OneToMany(mappedBy = "contest", cascade = CascadeType.ALL)
    @JsonManagedReference("contest-problems")
    private List<Problem> problems = new ArrayList<>();
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    public void addProblem(Problem problem) {
        problems.add(problem);
        problem.setContest(this);
    }
}