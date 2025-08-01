# ClinicDesk - Clinic Front Desk Management System

ClinicDesk is a comprehensive, full-stack web application designed to streamline the daily operations of a medical clinic's front desk. It provides a user-friendly interface for managing doctors, patients, appointments, and a real-time walk-in queue.

## Table of Contents

- [Features](#features)
- [Functionality Showcase](#functionality-showcase)
  - [Authentication](#authentication)
  - [Doctor Management](#doctor-management)
  - [Patient Management](#patient-management)
  - [Appointment Scheduling](#appointment-scheduling)
  - [Walk-in Queue](#walk-in-queue)
- [Tech Stack](#tech-stack)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)

## Features

- **User Authentication:** Secure sign-up and sign-in functionality for staff.
- **Doctor Management:** Add new doctors, view a list of all doctors, and manage their availability.
- **Patient Management:** Add new patients, view a list of all patients with their details, and access their history.
- **Appointment Scheduling:** Schedule new appointments by selecting a patient and a doctor, and view all scheduled appointments.
- **Walk-in Queue:** Manage a real-time queue for walk-in patients, track their status (waiting, in-progress, completed), and start their treatment.

## Functionality Showcase

### Authentication

Users can create an account and sign in to access the system.

### Doctor Management

Manage the clinic's doctors, including adding new doctors and viewing their availability.

### Patient Management

Keep track of all patient records, including personal details and registration dates.

### Appointment Scheduling

Easily schedule and manage appointments between doctors and patients.

### Walk-in Queue

A real-time queue for managing walk-in patients efficiently.

## Tech Stack

### Backend

- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MySQL](https://www.mysql.com) with [TypeORM](https://typeorm.io/)
- **Authentication:** [Passport.js](http://www.passportjs.org/) with JWT strategy
- **Validation:** [class-validator](https://github.com/typestack/class-validator), [class-transformer](https://github.com/typestack/class-transformer)

### Frontend

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/) (built on Radix UI)
- **State Management:** React Hooks
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for schema validation
- **API Communication:** [Axios](https://axios-http.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Dikshitsingla11/Allo_Health-assignment.git
    cd Allo_Health-assignment
    ```

2.  **Install backend dependencies:**
    ```bash
    cd clinic-backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../clinic-frontend
    npm install
    ```

4.  **Set up environment variables:**
    - In the `clinic-backend` directory, copy `.env.example` to `.env` and fill in your database credentials and JWT secret.
    - In the `clinic-frontend` directory, copy `.env.example` to `.env.local` and configure the API URL.

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd clinic-backend
    npm run start:dev
    ```

2.  **Start the frontend development server:**
    ```bash
    cd ../clinic-frontend
    npm run dev
    ```

The application will be available at "http://localhost:3000"  (not deployed)
