# AICTE Replica

A comprehensive working replica of the AICTE (All India Council for Technical Education) portal, designed to provide similar functionality and user experience for educational institution management and student services.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Method 1: Using Docker (Recommended)](#method-1-using-docker-recommended)
  - [Method 2: Manual Setup](#method-2-manual-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Default Credentials](#default-credentials)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## About

This project is a fully functional replica of the AICTE portal system that provides:
- Institution approval and accreditation management
- Student services and verification
- Faculty information management
- Course and program administration
- Grievance management system
- Interactive dashboards with role-based access control
- RESTful API with JWT authentication

## Features

### Core Functionality

- **Institution Management**
  - Search AICTE approved institutions by name or state
  - View institution details including approval status
  - Institution registration and profile management

- **Student Services**
  - Student verification by ID
  - View enrollment and institution details
  - Student registration system

- **Grievance Portal**
  - Submit and track grievances
  - Auto-generated ticket numbers
  - Category-based grievance management

- **Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Role-based access control (ADMIN, USER, STUDENT, FACULTY, INSTITUTION)

- **Dashboard**
  - Personalized user dashboard
  - Quick access to all services
  - Profile management

- **Announcements**
  - View latest announcements
  - Category-based filtering
  - Priority-based display

## Tech Stack

### Frontend
- **Framework**: React 18.2.0
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Custom CSS with responsive design
- **Build Tool**: React Scripts (Create React App)

### Backend
- **Language**: Java 17
- **Framework**: Spring Boot 3.2.0
- **Security**: Spring Security with JWT
- **ORM**: Spring Data JPA (Hibernate)
- **Validation**: Jakarta Validation
- **Build Tool**: Maven

### Database
- **Database**: PostgreSQL 15
- **ORM**: Hibernate/JPA

### DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for frontend in production)

## Getting Started

### Prerequisites

Ensure you have the following installed:

**For Docker Setup:**
- Docker (20.x or higher)
- Docker Compose (2.x or higher)

**For Manual Setup:**
- Java 17 or higher (JDK)
- Maven 3.6 or higher
- Node.js 18.x or higher
- PostgreSQL 15 or higher
- Git

## Method 1: Using Docker (Recommended)

This is the easiest way to get started. Docker will handle all dependencies automatically.

### Step 1: Clone the Repository

```bash
git clone https://github.com/saurabh-sudo/AICTE-Replica.git
cd AICTE-Replica
```

### Step 2: Start All Services

```bash
docker-compose up -d
```

This command will:
- Create and start PostgreSQL database
- Build and start the Java Spring Boot backend
- Build and start the React frontend
- Initialize the database with schema

### Step 3: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Database**: localhost:5432

### Step 4: Stop All Services

```bash
docker-compose down
```

To stop and remove all data including database volumes:
```bash
docker-compose down -v
```

## Method 2: Manual Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/saurabh-sudo/AICTE-Replica.git
cd AICTE-Replica
```

### Step 2: Set Up PostgreSQL Database

1. Start PostgreSQL service
2. Create database:
```bash
createdb aicte_db
```

3. Run the database schema:
```bash
psql -U postgres -d aicte_db -f database/schema.sql
```

### Step 3: Configure Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Update `src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/aicte_db
spring.datasource.username=postgres
spring.datasource.password=postgres
```

3. Build the backend:
```bash
mvn clean install
```

4. Run the backend:
```bash
mvn spring-boot:run
```

The backend will start on http://localhost:8080

### Step 4: Configure and Run Frontend

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on http://localhost:3000

## Project Structure

```
AICTE-Replica/
├── backend/                           # Java Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/aicte/
│   │   │   │   ├── config/           # Configuration classes
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   └── ModelMapperConfig.java
│   │   │   │   ├── controller/       # REST Controllers
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── InstitutionController.java
│   │   │   │   │   ├── AnnouncementController.java
│   │   │   │   │   ├── StudentController.java
│   │   │   │   │   └── GrievanceController.java
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── entity/           # JPA Entities
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── Institution.java
│   │   │   │   │   ├── Course.java
│   │   │   │   │   ├── Student.java
│   │   │   │   │   ├── Announcement.java
│   │   │   │   │   └── Grievance.java
│   │   │   │   ├── repository/       # Spring Data Repositories
│   │   │   │   ├── security/         # Security & JWT
│   │   │   │   │   ├── JwtUtils.java
│   │   │   │   │   ├── UserDetailsImpl.java
│   │   │   │   │   ├── UserDetailsServiceImpl.java
│   │   │   │   │   └── AuthTokenFilter.java
│   │   │   │   ├── service/          # Business Logic
│   │   │   │   └── AicteReplicaApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                          # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/               # Reusable Components
│   │   │   ├── Navbar.js
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.js
│   │   │   └── Footer.css
│   │   ├── pages/                    # Page Components
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Auth.css
│   │   │   ├── InstitutionSearch.js
│   │   │   ├── InstitutionSearch.css
│   │   │   ├── StudentVerification.js
│   │   │   ├── StudentVerification.css
│   │   │   ├── Dashboard.js
│   │   │   ├── Dashboard.css
│   │   │   ├── Grievance.js
│   │   │   └── Grievance.css
│   │   ├── services/                 # API Services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── institutionService.js
│   │   │   ├── announcementService.js
│   │   │   ├── studentService.js
│   │   │   └── grievanceService.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── database/
│   └── schema.sql                    # PostgreSQL Schema
│
├── docker-compose.yml                # Docker Compose Configuration
├── .gitignore
└── README.md
```

## API Documentation

### Base URL
- Development: `http://localhost:8080/api`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "role": "USER"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "role": "ROLE_USER"
}
```

### Institution Endpoints

#### Get All Institutions (Requires Authentication)
```http
GET /api/institutions
Authorization: Bearer {token}
```

#### Search Institutions by Name (Public)
```http
GET /api/institutions/search/name?name={institutionName}
```

#### Search Institutions by State (Public)
```http
GET /api/institutions/search/state?state={stateName}
```

#### Get Approved Institutions (Public)
```http
GET /api/institutions/approved
```

### Student Endpoints

#### Verify Student (Public)
```http
GET /api/students/verify/{studentId}

Response:
{
  "verified": true,
  "studentId": "STU001",
  "name": "Jane Smith",
  "institution": "ABC Engineering College",
  "course": "Computer Science",
  "enrollmentYear": 2020
}
```

### Announcement Endpoints

#### Get All Active Announcements (Public)
```http
GET /api/announcements
```

#### Get Announcement by ID (Public)
```http
GET /api/announcements/{id}
```

### Grievance Endpoints

#### Create Grievance (Requires Authentication)
```http
POST /api/grievances
Authorization: Bearer {token}
Content-Type: application/json

{
  "category": "Technical Issue",
  "subject": "Portal Login Problem",
  "description": "Unable to login to the portal",
  "priority": "HIGH"
}

Response:
{
  "id": 1,
  "ticketNumber": "TKT1234567890",
  "category": "Technical Issue",
  "subject": "Portal Login Problem",
  "status": "OPEN",
  "priority": "HIGH"
}
```

#### Get Grievance by Ticket Number (Requires Authentication)
```http
GET /api/grievances/{ticketNumber}
Authorization: Bearer {token}
```

## Default Credentials

The database is initialized with a default admin user:

- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@aicte.gov.in`
- **Role**: `ADMIN`

You can use these credentials to login and access admin features.

## Application Features Walkthrough

### 1. Home Page
- View latest announcements
- Quick access to all services
- Information about AICTE

### 2. Institution Search
- Search approved institutions by name
- Filter institutions by state
- View detailed institution information
- No authentication required

### 3. Student Verification
- Verify student enrollment
- View student details including institution and course
- No authentication required

### 4. User Registration & Login
- Register as USER, STUDENT, FACULTY, or INSTITUTION
- Secure JWT-based authentication
- Password encryption with BCrypt

### 5. Dashboard (Requires Login)
- View profile information
- Quick access to services
- Personalized user experience

### 6. Grievance Portal
- Submit grievances with categories
- Auto-generated ticket numbers
- Track grievance status
- Requires authentication

## Troubleshooting

### Docker Issues

**Problem**: Containers fail to start
```bash
# Check container logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Restart containers
docker-compose restart
```

**Problem**: Port already in use
```bash
# Check what's using the port
lsof -i :3000
lsof -i :8080
lsof -i :5432

# Kill the process or change ports in docker-compose.yml
```

### Database Issues

**Problem**: Database connection failed
- Ensure PostgreSQL is running
- Check database credentials in `application.properties`
- Verify database `aicte_db` exists

**Problem**: Schema not initialized
```bash
# Manually run schema
psql -U postgres -d aicte_db -f database/schema.sql
```

### Backend Issues

**Problem**: Maven build fails
```bash
# Clean and rebuild
mvn clean install -U

# Skip tests if needed
mvn clean install -DskipTests
```

**Problem**: Port 8080 already in use
```bash
# Find process using port
lsof -i :8080

# Change port in application.properties
server.port=8081
```

### Frontend Issues

**Problem**: npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem**: API connection refused
- Ensure backend is running on port 8080
- Check proxy configuration in `package.json`
- Verify API URL in `services/api.js`

## Testing the Application

### 1. Test User Registration
1. Navigate to http://localhost:3000/signup
2. Fill in the registration form
3. Click "Sign Up"

### 2. Test Login
1. Navigate to http://localhost:3000/login
2. Use default admin credentials or your registered user
3. Click "Login"

### 3. Test Institution Search
1. Navigate to http://localhost:3000/institutions
2. Search by name or state
3. View institution details

### 4. Test Student Verification
1. Navigate to http://localhost:3000/verify-student
2. Enter a student ID (if you have added any)
3. View verification results

### 5. Test Grievance Submission
1. Login first
2. Navigate to http://localhost:3000/grievance
3. Fill in the grievance form
4. Submit and note the ticket number

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- **Backend**: Follow Java coding conventions and Spring Boot best practices
- **Frontend**: Use ESLint and React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## License

This project is licensed under the MIT License.

## Contact

- GitHub: [@saurabh-sudo](https://github.com/saurabh-sudo)
- Project Link: [https://github.com/saurabh-sudo/AICTE-Replica](https://github.com/saurabh-sudo/AICTE-Replica)

---

## Key Technologies Used

- **Spring Boot 3.2.0** - Backend framework
- **Spring Security** - Authentication & authorization
- **JWT (JSON Web Tokens)** - Secure token-based authentication
- **Spring Data JPA** - Database operations
- **PostgreSQL** - Relational database
- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Docker** - Containerization
- **Maven** - Build automation for Java

## Architecture Highlights

- **RESTful API** design with proper HTTP methods and status codes
- **JWT-based authentication** for stateless security
- **Role-based access control** (RBAC) for authorization
- **Responsive design** for mobile and desktop
- **Dockerized deployment** for easy setup and scalability
- **Separation of concerns** with MVC pattern
- **Service layer** for business logic
- **Repository pattern** for data access

---

**Made with dedication for the education sector** 🎓

For issues and support, please create an issue on GitHub.
