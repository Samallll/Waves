package com.waves.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long userId;

    private String fullName;

    private String role;

    private String emailId;

    private boolean isLocked;

    private String phoneNumber;

    private Long bankId;
}
