package com.aicte.controller;

import com.aicte.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/verify/{studentId}")
    public ResponseEntity<Map<String, Object>> verifyStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(studentService.verifyStudent(studentId));
    }
}
