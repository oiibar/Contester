package com.example.tutorial.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "discussions")
public class Discussion {
    @Id
    @SequenceGenerator(
            name = "discussion_sequence",
            sequenceName = "discussion_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "discussion_sequence"
    )
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @Column(nullable = false)
    private String userId; // ID of the user who created the comment

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private int upvotes = 0;
    private int downvotes = 0;

    public void upvote() {
        this.upvotes++;
    }

    public void downvote() {
        this.downvotes++;
    }

    public void removeUpvote() {
        if (this.upvotes > 0) this.upvotes--;
    }

    public void removeDownvote() {
        if (this.downvotes > 0) this.downvotes--;
    }


    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "discussion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replies;
}
