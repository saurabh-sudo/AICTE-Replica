package com.aicte.repository;

import com.aicte.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstitutionId(Long institutionId);
    List<Course> findByLevel(Course.CourseLevel level);
    List<Course> findByIsActive(Boolean isActive);
}
