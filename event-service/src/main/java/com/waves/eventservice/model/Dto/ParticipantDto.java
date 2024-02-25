package com.waves.eventservice.model.Dto;


import lombok.*;

    @ToString
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class ParticipantDto {

        private Long participantId;

        private String about;

        private String designation;

        private String dietaryPreference;

        private Long eventId;

        private Long userId;

        private String fullName;

        private String emailId;
    }
