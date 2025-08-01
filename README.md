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
<img width="1880" height="932" alt="Screenshot 2025-08-01 175933" src="https://github.com/user-attachments/assets/590b99a3-61ae-48bb-8807-901ab927c6c0" />
<img width="1885" height="908" alt="Screenshot 2025-08-01 175951" src="https://github.com/user-attachments/assets/e18f968e-4074-47e6-bc6a-0f20316aa640" />


### Doctor Management

Manage the clinic's doctors, including adding new doctors and viewing their availability.
<img width="1882" height="936" alt="Screenshot 2025-08-01 180506" src="https://github.com/user-attachments/assets/d7bb9170-8f7f-426f-8cdd-09a4aac17e28" />
<img width="767" height="785" alt="Screenshot 2025-08-01 180519" src="https://github.com/user-attachments/assets/923f224b-8422-4186-b068-c9629b4f5e35" />



### Patient Management

Keep track of all patient records, including personal details and registration dates.
<img width="1890" height="839" alt="Screenshot 2025-08-01 180431" src="https://github.com/user-attachments/assets/2ff66062-d2ed-4c86-b335-82a87e8ffa6f" />


### Appointment Scheduling

Easily schedule and manage appointments between doctors and patients.
<img width="1909" height="954" alt="Screenshot 2025-08-01 180326" src="https://github.com/user-attachments/assets/a7e909b5-a821-4949-b8cc-11a67b5fe18c" />
<img width="705" height="782" alt="Screenshot 2025-08-01 180350" src="https://github.com/user-attachments/assets/ac77a2da-485b-43aa-8981-3312bc559d28" />



### Walk-in Queue

A real-time queue for managing walk-in patients efficiently.
<img width="1913" height="952" alt="Screenshot 2025-08-01 180204" src="https://github.com/user-attachments/assets/e4e474a3-e71c-4f70-98a1-de31f58864b6" />
<img width="800" height="899" alt="Screenshot 2025-08-01 180405" src="https://github.com/user-attachments/assets/06c6b84e-c22f-4a86-b9b3-946f1595d9a8" />



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


