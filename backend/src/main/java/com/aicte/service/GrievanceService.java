package com.aicte.service;

import com.aicte.dto.GrievanceDTO;
import com.aicte.entity.Grievance;
import com.aicte.repository.GrievanceRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class GrievanceService {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Autowired
    private ModelMapper modelMapper;

    public GrievanceDTO createGrievance(GrievanceDTO grievanceDTO) {
        Grievance grievance = modelMapper.map(grievanceDTO, Grievance.class);
        grievance.setTicketNumber(generateTicketNumber());
        grievance.setStatus(Grievance.Status.OPEN);

        Grievance savedGrievance = grievanceRepository.save(grievance);
        return modelMapper.map(savedGrievance, GrievanceDTO.class);
    }

    public List<GrievanceDTO> getAllGrievances() {
        return grievanceRepository.findAll().stream()
                .map(grievance -> modelMapper.map(grievance, GrievanceDTO.class))
                .collect(Collectors.toList());
    }

    public GrievanceDTO getGrievanceByTicketNumber(String ticketNumber) {
        Grievance grievance = grievanceRepository.findByTicketNumber(ticketNumber)
                .orElseThrow(() -> new RuntimeException("Grievance not found with ticket number: " + ticketNumber));
        return modelMapper.map(grievance, GrievanceDTO.class);
    }

    private String generateTicketNumber() {
        return "TKT" + System.currentTimeMillis() + new Random().nextInt(1000);
    }
}
