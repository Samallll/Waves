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
public class Host {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hostId;

    @OneToOne
    private HostRequest hostRequest;

    private Long userId;

    private String emailId;

    private boolean isLocked;

    private String designation;

    public Host(Long userId, String emailId,String designation) {
        this.emailId = emailId;
        this.userId = userId;
        this.designation = designation;
    }
}
