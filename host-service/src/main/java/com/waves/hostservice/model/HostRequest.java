package com.waves.hostservice.model;

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
public class HostRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hostRequestId;

    private Long userId;

    private String emailId;

    private String aadharNumber;

    private Long bankId;

    @Enumerated(EnumType.STRING)
    private RequestStatus status = RequestStatus.PENDING;

    private String designation;

    private String about;

}
