package com.waves.emailservice.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class EmailDto implements Serializable {

    private String subject;
    private String toList;
    private String body;

}
