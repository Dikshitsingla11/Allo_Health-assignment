# 🏥 ClinicDesk - Front Desk Management System

A comprehensive web-based clinic front desk system built with Next.js and designed to streamline patient management, appointment scheduling, and queue management.

## ✨ Features

### 🔐 Authentication
- JWT-based login system for front desk staff
- Protected routes with automatic token management
- Secure logout functionality

### 📋 Queue Management
- Real-time walk-in patient queue
- Priority system (Normal/Urgent)
- Patient status tracking (Waiting/In Progress/Completed)
- Queue statistics and analytics

### 📅 Appointment Management
- Schedule, reschedule, and cancel appointments
- Doctor and patient selection
- Date and time slot management
- Appointment status tracking

### 👥 Patient Management
- Complete patient records database
- Patient search and filtering
- Demographics and contact information
- Medical history integration ready

### 🧑‍⚕️ Doctor Management
- Doctor profiles and specializations
- Availability status management
- Schedule and contact information
- Real-time availability updates

## 🚀 Tech Stack

### Frontend
- **Next.js 13** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Lucide React** for icons
- **Axios** for API calls

### Backend Integration Ready
- RESTful API structure
- JWT token management
- Error handling and validation
- Mock data for development

## 📦 Installation

1. **Clone and Setup**
   ```bash
   cd clinic-frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### Login
- Use any email/password combination in demo mode
- Real authentication ready for backend integration

### Queue Management
1. Navigate to **Queue** page
2. Click **"Add Patient"** to register walk-in patients
3. Use **"Start Treatment"** to begin patient consultation
4. Mark patients as **"Complete"** when done

### Appointment Scheduling
1. Go to **Appointments** page
2. Click **"Schedule Appointment"** 
3. Select patient, doctor, date, and time
4. Add notes and confirm booking

### Patient Records
- Access **Patients** page for complete patient database
- Search by name, phone, or email
- View patient demographics and history

### Doctor Management
- **Doctors** page shows all medical staff
- Toggle availability status
- View specializations and schedules

## 🛠️ API Integration

The frontend is ready to connect to any backend API. Key integration points:

### Authentication Endpoints
```typescript
POST /auth/login
POST /auth/logout
GET /auth/me
```

### Queue Management
```typescript
GET /queue
POST /queue/add
PATCH /queue/:id/start
PATCH /queue/:id/complete
```

### Appointments
```typescript
GET /appointments?date=YYYY-MM-DD
POST /appointments
PATCH /appointments/:id
DELETE /appointments/:id
```

### Patients & Doctors
```typescript
GET /patients
POST /patients
PUT /patients/:id
DELETE /patients/:id

GET /doctors
POST /doctors
PUT /doctors/:id
DELETE /doctors/:id
```

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Live queue and appointment status
- **Intuitive Navigation**: Easy-to-use interface for busy front desk staff
- **Professional Styling**: Clean, medical-themed design
- **Accessibility**: WCAG compliant interface elements

## 🔧 Customization

### Adding New Features
1. Create new components in `/components`
2. Add new pages in `/app`
3. Update types in `/types/index.ts`
4. Integrate with API in `/utils/api.ts`

### Styling
- Modify `tailwind.config.ts` for theme changes
- Update `/app/globals.css` for global styles
- Components use shadcn/ui for consistency

## 📱 Mobile Optimization

The application is fully responsive and optimized for:
- **Desktop**: Full dashboard experience
- **Tablet**: Touch-optimized for front desk stations  
- **Mobile**: Quick access for on-the-go updates

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Static Export
```bash
npm run build
```
Files will be in the `out/` directory for static hosting.

## 🤝 Backend Integration

This frontend is designed to work with any backend that provides the specified API endpoints. For a complete solution, implement:

1. **NestJS Backend** with TypeORM and PostgreSQL
2. **JWT Authentication** system
3. **RESTful API** following the documented endpoints
4. **Database Schema** matching the TypeScript interfaces

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- shadcn/ui for the beautiful component library
- Lucide React for the icon system
- Tailwind CSS for the utility-first styling approach