package com.waves.eventservice.model.Dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {

    private Long userId;

    private String fullName;

    private String role;

    private String emailId;

    private boolean isLocked;

    private String phoneNumber;

    private Long bankId;
}
