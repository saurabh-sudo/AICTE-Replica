package com.aicte.repository;

import com.aicte.entity.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
    Optional<Grievance> findByTicketNumber(String ticketNumber);
    List<Grievance> findByUserId(Long userId);
    List<Grievance> findByStatus(Grievance.Status status);
}
