package com.aicte.service;

import com.aicte.dto.AnnouncementDTO;
import com.aicte.entity.Announcement;
import com.aicte.repository.AnnouncementRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<AnnouncementDTO> getAllActiveAnnouncements() {
        return announcementRepository.findByIsActiveOrderByPublishedDateDesc(true).stream()
                .map(announcement -> modelMapper.map(announcement, AnnouncementDTO.class))
                .collect(Collectors.toList());
    }

    public List<AnnouncementDTO> getAnnouncementsByCategory(String category) {
        return announcementRepository.findByCategoryOrderByPublishedDateDesc(category).stream()
                .map(announcement -> modelMapper.map(announcement, AnnouncementDTO.class))
                .collect(Collectors.toList());
    }

    public AnnouncementDTO getAnnouncementById(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));
        return modelMapper.map(announcement, AnnouncementDTO.class);
    }

    public AnnouncementDTO createAnnouncement(AnnouncementDTO announcementDTO) {
        Announcement announcement = modelMapper.map(announcementDTO, Announcement.class);
        Announcement savedAnnouncement = announcementRepository.save(announcement);
        return modelMapper.map(savedAnnouncement, AnnouncementDTO.class);
    }
}
