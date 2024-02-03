package com.waves.hostservice.model.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class EmailDto {

    private String subject;
    private String toList;
    private String body;

}
