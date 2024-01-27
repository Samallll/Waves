package com.waves.hostservice.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class HostRequestDto {

    private Long hostRequestId;

    private Long userId;

    private String email;

    private Long bankDetailId;

    private boolean isApproved;

    public HostRequestDto(Long hostRequestId, Long userId, String emailId, Long bankDetailId, boolean approved) {
        this.hostRequestId = hostRequestId;
        this.userId = userId;
        this.email = emailId;
        this.bankDetailId = bankDetailId;
        this.isApproved = approved;
    }
}
