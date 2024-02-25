package com.waves.userservice.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EmailDto {

    private String subject;
    private String toList;
    private String body;
}
