-- AICTE Replica Database Schema

-- Create database
-- CREATE DATABASE aicte_db;
-- USE aicte_db;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'INSTITUTION', 'STUDENT', 'FACULTY', 'USER')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Institutions table
CREATE TABLE IF NOT EXISTS institutions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    institution_code VARCHAR(50) UNIQUE NOT NULL,
    institution_name VARCHAR(500) NOT NULL,
    institution_type VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    established_year INTEGER,
    affiliation VARCHAR(255),
    approval_status VARCHAR(50) DEFAULT 'PENDING' CHECK (approval_status IN ('PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW')),
    accreditation_status VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses/Programs table
CREATE TABLE IF NOT EXISTS courses (
    id BIGSERIAL PRIMARY KEY,
    institution_id BIGINT REFERENCES institutions(id) ON DELETE CASCADE,
    course_code VARCHAR(50) NOT NULL,
    course_name VARCHAR(500) NOT NULL,
    course_type VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL CHECK (level IN ('DIPLOMA', 'UG', 'PG', 'DOCTORAL')),
    duration_years INTEGER NOT NULL,
    intake_capacity INTEGER NOT NULL,
    approval_year INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(institution_id, course_code)
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    institution_id BIGINT REFERENCES institutions(id),
    course_id BIGINT REFERENCES courses(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    enrollment_year INTEGER,
    graduation_year INTEGER,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Faculty table
CREATE TABLE IF NOT EXISTS faculty (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    faculty_id VARCHAR(50) UNIQUE NOT NULL,
    institution_id BIGINT REFERENCES institutions(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    designation VARCHAR(100),
    department VARCHAR(200),
    qualification VARCHAR(255),
    specialization VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    joining_date DATE,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Announcements/Notifications table
CREATE TABLE IF NOT EXISTS announcements (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    priority VARCHAR(50) DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH', 'URGENT')),
    published_by BIGINT REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
    id BIGSERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    uploaded_by BIGINT REFERENCES users(id),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Approvals/Applications table
CREATE TABLE IF NOT EXISTS applications (
    id BIGSERIAL PRIMARY KEY,
    application_number VARCHAR(100) UNIQUE NOT NULL,
    application_type VARCHAR(100) NOT NULL,
    applicant_id BIGINT REFERENCES users(id),
    institution_id BIGINT REFERENCES institutions(id),
    status VARCHAR(50) DEFAULT 'SUBMITTED' CHECK (status IN ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'PENDING_INFO')),
    remarks TEXT,
    submitted_date TIMESTAMP,
    reviewed_date TIMESTAMP,
    reviewed_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grievances/Feedback table
CREATE TABLE IF NOT EXISTS grievances (
    id BIGSERIAL PRIMARY KEY,
    ticket_number VARCHAR(100) UNIQUE NOT NULL,
    user_id BIGINT REFERENCES users(id),
    category VARCHAR(100) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'REJECTED')),
    priority VARCHAR(50) DEFAULT 'MEDIUM',
    assigned_to BIGINT REFERENCES users(id),
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

-- Search logs (optional for analytics)
CREATE TABLE IF NOT EXISTS search_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    search_type VARCHAR(50),
    search_query VARCHAR(500),
    results_count INTEGER,
    search_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_institutions_status ON institutions(approval_status);
CREATE INDEX idx_institutions_state ON institutions(state);
CREATE INDEX idx_students_institution ON students(institution_id);
CREATE INDEX idx_courses_institution ON courses(institution_id);
CREATE INDEX idx_announcements_active ON announcements(is_active, published_date);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_grievances_status ON grievances(status);
CREATE INDEX idx_documents_entity ON documents(entity_type, entity_id);

-- Insert default admin user (password: admin123 - hashed with bcrypt)
INSERT INTO users (username, email, password, full_name, role, is_active)
VALUES ('admin', 'admin@aicte.gov.in', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 'System Administrator', 'ADMIN', true)
ON CONFLICT (username) DO NOTHING;

-- Insert sample announcements
INSERT INTO announcements (title, content, category, priority, published_by, is_active)
VALUES
('Welcome to AICTE Portal', 'Official portal for All India Council for Technical Education. Verify institutions, search approved colleges, and access student services.', 'GENERAL', 'HIGH', 1, true),
('New Academic Session 2024-25', 'Applications for new academic session 2024-25 are now open. Institutions can apply for course approvals.', 'ACADEMIC', 'NORMAL', 1, true)
ON CONFLICT DO NOTHING;
