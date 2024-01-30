package com.waves.hostservice.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HostRequestDto {

    private Long hostRequestId;

    private Long userId;

    private String email;

    private Long bankId;

    private RequestStatus status;

    private String designation;

    private String about;

    public HostRequestDto(Long hostRequestId, Long userId, String emailId, Long bankId, RequestStatus status, String designation, String about) {
        this.hostRequestId = hostRequestId;
        this.userId = userId;
        this.email = emailId;
        this.bankId = bankId;
        this.status = status;
        this.designation = designation;
        this.about = about;
    }
}
