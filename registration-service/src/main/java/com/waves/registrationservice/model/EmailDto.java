package com.waves.registrationservice.model;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EmailDto {

    private String subject;
    private String toList;
    private String body;
}
