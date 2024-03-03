package com.waves.eventservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.waves.eventservice.model.Enum.JobRequestStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.Fetch;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class JobRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobRequestId;

    @NotNull(message = "User Id should not be null")
    private Long userId;

    @Enumerated(EnumType.STRING)
    private JobRequestStatus jobRequestStatus = JobRequestStatus.PENDING;

    @Size(min =  10, message = "About the Job Request must be more than 10 characters long")
    private String about;

    @Size(min =  5, message = "Designation must be more than 5 characters long")
    private String designation;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "job_post_id")
    private JobPost jobPost;

    @NotNull(message = "AadharNumber must not be null")
    @Size(min =  12, message = "AadharNumber should be 12 characters long")
    private String aadharNumber;

    @NotNull(message = "DietaryPreference should not be null")
    private String dietaryPreference;

    @NotNull(message = "Full Name should not be null")
    private String fullName;

    @NotNull(message = "Email Id should not be null")
    private String emailId;

}
