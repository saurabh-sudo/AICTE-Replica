package com.aicte.repository;

import com.aicte.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long> {
    Optional<Institution> findByInstitutionCode(String institutionCode);
    List<Institution> findByState(String state);
    List<Institution> findByCity(String city);
    List<Institution> findByApprovalStatus(Institution.ApprovalStatus status);
    List<Institution> findByInstitutionNameContainingIgnoreCase(String name);
}
