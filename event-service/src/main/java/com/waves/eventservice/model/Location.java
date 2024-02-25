package com.waves.eventservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    @Column(nullable = false)
    @Size(min =  3, message = "Street Address must not be empty and should be at least 3 characters long")
    private String streetAddress;

    @Column(nullable = false)
    @Size(min =  2, message = "Country must not be empty and should be at least 2 characters long")
    private String country;

    @Column(nullable = false)
    @Size(min =  2, message = "State must not be empty and should be at least 2 characters long")
    private String state;

    @Column(nullable = false)
    @Size(min =  2, message = "City must not be empty and should be at least 2 characters long")
    private String city;

    @Column(nullable = false)
    @Size(min =  5, message = "Zip Code must not be empty and should be at least 5 characters long")
    private String zipCode;

    @OneToOne(mappedBy = "location", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private Event event;

}
