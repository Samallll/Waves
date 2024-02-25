package com.waves.eventservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobPostId;

    @NotEmpty(message = "Job Name must not be empty and should be at least 3 characters long")
    @Size(min =  3, message = "Job Name must not be empty and should be at least 3 characters long")
    private String jobName;

    @NotEmpty(message = "Skills Required must not be empty and each skill should be at least 3 characters long")
    private String skillsRequired;

    @NotEmpty(message = "Job Description must not be empty and should be at least 10 characters long")
    @Size(min =  10, message = "Job Description must not be empty and should be at least 10 characters long")
    private String jobDescription;

    @NotEmpty(message = "Terms And Conditions must not be empty and should be at least 10 characters long")
    @Size(min =  10, message = "Terms And Conditions must not be empty and should be at least 10 characters long")
    private String termsAndConditions;

    @Min(value =  1, message = "Open Positions must be a positive integer")
    private Integer openPositions;

    @OneToOne(mappedBy = "jobPost",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id",referencedColumnName = "eventId")
    @JsonManagedReference
    private Event event;

    @OneToMany(mappedBy = "jobPost", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Organizer> organizers;

    private boolean isActive=true;

    @Min(value =  0, message = "Salary must be a positive number")
    private Double salary;

    @NotNull(message = "Posted by User Id must not be null")
    private Long postedByUserId;

}
