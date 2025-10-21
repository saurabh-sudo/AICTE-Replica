package com.aicte.controller;

import com.aicte.dto.GrievanceDTO;
import com.aicte.service.GrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/grievances")
public class GrievanceController {

    @Autowired
    private GrievanceService grievanceService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'STUDENT', 'FACULTY', 'INSTITUTION')")
    public ResponseEntity<GrievanceDTO> createGrievance(@RequestBody GrievanceDTO grievanceDTO) {
        return ResponseEntity.ok(grievanceService.createGrievance(grievanceDTO));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<GrievanceDTO>> getAllGrievances() {
        return ResponseEntity.ok(grievanceService.getAllGrievances());
    }

    @GetMapping("/{ticketNumber}")
    public ResponseEntity<GrievanceDTO> getGrievanceByTicketNumber(@PathVariable String ticketNumber) {
        return ResponseEntity.ok(grievanceService.getGrievanceByTicketNumber(ticketNumber));
    }
}
