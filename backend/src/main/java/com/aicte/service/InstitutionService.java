package com.aicte.service;

import com.aicte.dto.InstitutionDTO;
import com.aicte.entity.Institution;
import com.aicte.repository.InstitutionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository institutionRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<InstitutionDTO> getAllInstitutions() {
        return institutionRepository.findAll().stream()
                .map(institution -> modelMapper.map(institution, InstitutionDTO.class))
                .collect(Collectors.toList());
    }

    public InstitutionDTO getInstitutionById(Long id) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institution not found with id: " + id));
        return modelMapper.map(institution, InstitutionDTO.class);
    }

    public List<InstitutionDTO> searchInstitutions(String name) {
        return institutionRepository.findByInstitutionNameContainingIgnoreCase(name).stream()
                .map(institution -> modelMapper.map(institution, InstitutionDTO.class))
                .collect(Collectors.toList());
    }

    public List<InstitutionDTO> getInstitutionsByState(String state) {
        return institutionRepository.findByState(state).stream()
                .map(institution -> modelMapper.map(institution, InstitutionDTO.class))
                .collect(Collectors.toList());
    }

    public List<InstitutionDTO> getApprovedInstitutions() {
        return institutionRepository.findByApprovalStatus(Institution.ApprovalStatus.APPROVED).stream()
                .map(institution -> modelMapper.map(institution, InstitutionDTO.class))
                .collect(Collectors.toList());
    }

    public InstitutionDTO createInstitution(InstitutionDTO institutionDTO) {
        Institution institution = modelMapper.map(institutionDTO, Institution.class);
        institution.setApprovalStatus(Institution.ApprovalStatus.PENDING);
        Institution savedInstitution = institutionRepository.save(institution);
        return modelMapper.map(savedInstitution, InstitutionDTO.class);
    }

    public InstitutionDTO updateInstitution(Long id, InstitutionDTO institutionDTO) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institution not found with id: " + id));

        modelMapper.map(institutionDTO, institution);
        institution.setId(id);
        Institution updatedInstitution = institutionRepository.save(institution);
        return modelMapper.map(updatedInstitution, InstitutionDTO.class);
    }

    public void deleteInstitution(Long id) {
        institutionRepository.deleteById(id);
    }
}
