package com.aicte.controller;

import com.aicte.dto.InstitutionDTO;
import com.aicte.service.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/institutions")
public class InstitutionController {

    @Autowired
    private InstitutionService institutionService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<InstitutionDTO>> getAllInstitutions() {
        return ResponseEntity.ok(institutionService.getAllInstitutions());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<InstitutionDTO> getInstitutionById(@PathVariable Long id) {
        return ResponseEntity.ok(institutionService.getInstitutionById(id));
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<InstitutionDTO>> searchInstitutions(@RequestParam String name) {
        return ResponseEntity.ok(institutionService.searchInstitutions(name));
    }

    @GetMapping("/search/state")
    public ResponseEntity<List<InstitutionDTO>> getInstitutionsByState(@RequestParam String state) {
        return ResponseEntity.ok(institutionService.getInstitutionsByState(state));
    }

    @GetMapping("/approved")
    public ResponseEntity<List<InstitutionDTO>> getApprovedInstitutions() {
        return ResponseEntity.ok(institutionService.getApprovedInstitutions());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InstitutionDTO> createInstitution(@RequestBody InstitutionDTO institutionDTO) {
        return ResponseEntity.ok(institutionService.createInstitution(institutionDTO));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InstitutionDTO> updateInstitution(@PathVariable Long id, @RequestBody InstitutionDTO institutionDTO) {
        return ResponseEntity.ok(institutionService.updateInstitution(id, institutionDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteInstitution(@PathVariable Long id) {
        institutionService.deleteInstitution(id);
        return ResponseEntity.ok().build();
    }
}
