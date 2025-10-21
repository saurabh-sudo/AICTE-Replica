package com.aicte.repository;

import com.aicte.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByIsActiveOrderByPublishedDateDesc(Boolean isActive);
    List<Announcement> findByCategoryOrderByPublishedDateDesc(String category);
}
