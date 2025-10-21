package com.aicte.dto;

import lombok.Data;

@Data
public class GrievanceDTO {
    private Long id;
    private String ticketNumber;
    private String category;
    private String subject;
    private String description;
    private String status;
    private String priority;
}
