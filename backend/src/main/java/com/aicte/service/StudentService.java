package com.aicte.service;

import com.aicte.entity.Student;
import com.aicte.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Map<String, Object> verifyStudent(String studentId) {
        Optional<Student> studentOpt = studentRepository.findByStudentId(studentId);
        Map<String, Object> response = new HashMap<>();

        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            response.put("verified", true);
            response.put("studentId", student.getStudentId());
            response.put("name", student.getFirstName() + " " + student.getLastName());
            response.put("institution", student.getInstitution() != null ? student.getInstitution().getInstitutionName() : "N/A");
            response.put("course", student.getCourse() != null ? student.getCourse().getCourseName() : "N/A");
            response.put("enrollmentYear", student.getEnrollmentYear());
        } else {
            response.put("verified", false);
            response.put("message", "Student not found");
        }

        return response;
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }
}
