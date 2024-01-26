package com.waves.userservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Bank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bankId;

    private String bankName;

    private String IFSC;

    private String beneficiaryName;

    @Column(unique = true)
    private String accountNumber;

    private String accountType;

    @OneToOne
    @JoinColumn(referencedColumnName = "userId")
    @JsonBackReference
    private User user;

    public Bank(String bankName,
                String beneficiaryName,
                String ifsc,
                String accountNumber,
                String accountType) {
        this.accountNumber = accountNumber;
        this.beneficiaryName = beneficiaryName;
        this.bankName = bankName;
        this.accountType = accountType;
        this.IFSC = ifsc;
    }
}
