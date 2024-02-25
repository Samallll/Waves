package com.waves.eventservice.model.Dto;

import com.waves.eventservice.model.Enum.JobRequestStatus;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class JobRequestDto {

    private Long jobRequestId;

    private Long userId;

    private JobRequestStatus jobRequestStatus;

    private String about;

    private String designation;

    private Long jobPostId;

    private String aadharNumber;

    private String dietaryPreference;

    private String fullName;

    private String emailId;
}
