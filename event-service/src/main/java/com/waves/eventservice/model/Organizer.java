package com.waves.eventservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Organizer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long organizerId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "job_request_id", referencedColumnName = "jobRequestId")
    private JobRequest jobRequest;

    @NotNull(message = "User Id should not be null")
    private Long userId;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "job_post_id")
    private JobPost jobPost;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Organizer organizer = (Organizer) o;
        return userId.equals(organizer.userId) &&
                jobPost.getJobPostId().equals(organizer.jobPost.getJobPostId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, jobPost.getJobPostId());
    }
}
