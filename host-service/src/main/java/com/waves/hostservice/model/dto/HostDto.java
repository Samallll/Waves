package com.waves.hostservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HostDto {

    private Long hostId;

    private String emailId;

    private Long userId;

    private boolean isLocked;

    private Long hostRequestId;

    private String designation;
}
