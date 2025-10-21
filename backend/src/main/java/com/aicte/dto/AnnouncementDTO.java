package com.aicte.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AnnouncementDTO {
    private Long id;
    private String title;
    private String content;
    private String category;
    private String priority;
    private LocalDateTime publishedDate;
    private LocalDateTime expiryDate;
}
