package com.waves.eventservice.model.Dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EmailDto implements Serializable {

    private String subject;
    private String toList;
    private String body;

}
