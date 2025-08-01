# 🏥 Clinic Backend - NestJS API

A comprehensive backend API for clinic front desk management built with NestJS, TypeORM, and PostgreSQL.

## 🚀 Features

- **JWT Authentication** - Secure login system for front desk staff
- **Doctor Management** - CRUD operations for doctor records
- **Patient Management** - Complete patient database with search
- **Appointment System** - Schedule, reschedule, and cancel appointments
- **Queue Management** - Walk-in patient queue with priority system
- **Database Integration** - PostgreSQL with TypeORM
- **Validation** - Request validation with class-validator
- **CORS Support** - Configured for frontend integration

## 📦 Installation

1. **Install Dependencies**
   ```bash
   cd clinic-backend
   npm install
   ```

2. **Database Setup**
   ```bash
   # Install PostgreSQL (if not already installed)
   # Create database
   createdb clinic_db
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=clinic_db
   JWT_SECRET=your-super-secret-jwt-key
   PORT=3001
   FRONTEND_URL=http://localhost:3000
   ```

4. **Run the Application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## 🔗 API Endpoints

### Authentication
```
POST /auth/login          # Login with email/password
GET  /auth/me            # Get current user profile
```

### Doctors
```
GET    /doctors          # Get all doctors
GET    /doctors/available # Get available doctors
GET    /doctors/:id      # Get doctor by ID
POST   /doctors          # Create new doctor
PATCH  /doctors/:id      # Update doctor
DELETE /doctors/:id      # Delete doctor
```

### Patients
```
GET    /patients         # Get all patients (with optional search)
GET    /patients/:id     # Get patient by ID
POST   /patients         # Create new patient
PATCH  /patients/:id     # Update patient
DELETE /patients/:id     # Delete patient
```

### Appointments
```
GET    /appointments     # Get appointments (with optional date filter)
GET    /appointments/:id # Get appointment by ID
POST   /appointments     # Create new appointment
PATCH  /appointments/:id # Update appointment
PATCH  /appointments/:id/cancel   # Cancel appointment
PATCH  /appointments/:id/complete # Complete appointment
DELETE /appointments/:id # Delete appointment
```

### Queue
```
GET    /queue           # Get current waiting queue
GET    /queue/all       # Get all queue items
POST   /queue/add       # Add patient to queue
PATCH  /queue/:id/start # Start treatment
PATCH  /queue/:id/complete # Complete patient
DELETE /queue/:id       # Remove from queue
```

## 🗄️ Database Schema

### Users
- id (UUID, Primary Key)
- email (String, Unique)
- password (String, Hashed)
- name (String)
- role (Enum: 'admin', 'front-desk')
- isActive (Boolean)
- createdAt, updatedAt (Timestamps)

### Doctors
- id (UUID, Primary Key)
- name (String)
- specialization (String)
- phone (String)
- email (String)
- schedule (String)
- isAvailable (Boolean)
- createdAt, updatedAt (Timestamps)

### Patients
- id (UUID, Primary Key)
- name (String)
- phone (String)
- email (String, Optional)
- dateOfBirth (Date)
- address (String, Optional)
- emergencyContact (String, Optional)
- createdAt, updatedAt (Timestamps)

### Appointments
- id (UUID, Primary Key)
- patientId (UUID, Foreign Key)
- doctorId (UUID, Foreign Key)
- appointmentDate (Date)
- appointmentTime (Time)
- status (Enum: 'scheduled', 'completed', 'cancelled', 'no-show')
- notes (String, Optional)
- createdAt, updatedAt (Timestamps)

### Queue Items
- id (UUID, Primary Key)
- patientId (UUID, Foreign Key)
- queueNumber (Integer)
- status (Enum: 'waiting', 'in-progress', 'completed')
- priority (Enum: 'normal', 'urgent')
- notes (String, Optional)
- completedAt (Timestamp, Optional)
- createdAt, updatedAt (Timestamps)

## 🔧 Development

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Database Migrations
```bash
# Generate migration
npm run migration:generate -- src/migrations/MigrationName

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
```

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format
```

## 🌐 CORS Configuration

The API is configured to accept requests from the frontend URL specified in the environment variables. Update `FRONTEND_URL` in your `.env` file to match your frontend application.

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

All endpoints except `/auth/login` require authentication.

## 📝 Example Requests

### Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@clinic.com", "password": "password123"}'
```

### Create Doctor
```bash
curl -X POST http://localhost:3001/doctors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Dr. Smith",
    "specialization": "General Practice",
    "phone": "+1234567890",
    "email": "dr.smith@clinic.com",
    "schedule": "Mon-Fri 9AM-5PM"
  }'
```

### Add Patient to Queue
```bash
curl -X POST http://localhost:3001/queue/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "dateOfBirth": "1990-01-01",
    "priority": "normal",
    "notes": "First visit"
  }'
```

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Run database migrations**
   ```bash
   npm run migration:run
   ```

4. **Start the production server**
   ```bash
   npm run start:prod
   ```

## 📄 License

This project is licensed under the MIT License.