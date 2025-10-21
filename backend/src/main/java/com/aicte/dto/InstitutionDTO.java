package com.aicte.dto;

import lombok.Data;

@Data
public class InstitutionDTO {
    private Long id;
    private String institutionCode;
    private String institutionName;
    private String institutionType;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String phone;
    private String email;
    private String website;
    private Integer establishedYear;
    private String affiliation;
    private String approvalStatus;
    private String accreditationStatus;
}
