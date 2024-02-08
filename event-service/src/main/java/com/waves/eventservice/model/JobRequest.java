package com.waves.eventservice.model;

import com.waves.eventservice.model.Enum.JobRequestStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobRequestId;

    private Long userId;

    @Enumerated(EnumType.STRING)
    private JobRequestStatus jobRequestStatus;

    private String about;

    private String designation;

    @ManyToOne
    @JoinColumn(name = "job_post_id")
    private JobPost jobPost;
}
