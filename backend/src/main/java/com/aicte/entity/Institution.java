package com.aicte.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "institutions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Institution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "institution_code", unique = true, nullable = false, length = 50)
    private String institutionCode;

    @Column(name = "institution_name", nullable = false, length = 500)
    private String institutionName;

    @Column(name = "institution_type", nullable = false, length = 100)
    private String institutionType;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(nullable = false, length = 10)
    private String pincode;

    @Column(length = 20)
    private String phone;

    private String email;

    private String website;

    @Column(name = "established_year")
    private Integer establishedYear;

    private String affiliation;

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status", length = 50)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    @Column(name = "accreditation_status", length = 100)
    private String accreditationStatus;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum ApprovalStatus {
        PENDING, APPROVED, REJECTED, UNDER_REVIEW
    }
}
