package com.waves.eventservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobPostId;

    private String jobName;

    @OneToOne(mappedBy = "jobPost",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id",referencedColumnName = "eventId")
    private Event event;

    @ElementCollection
    @CollectionTable(joinColumns = @JoinColumn(name = "job_post_id"))
    @Column(name = "user_id")
    private List<Long> hiredUsers;

    private boolean isActive=true;

    private String jobDescription;

    private Integer openPositions;

    private Double salary;

    private String skillsRequired;

    private String termsAndConditions;
}
