export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  dateOfBirth: string;
  address?: string;
  emergencyContact?: string;
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  schedule: string;
  isAvailable: boolean;
  createdAt: string;
}

export interface QueueItem {
  id: string;
  patientId: string;
  patient: Patient;
  queueNumber: number;
  status: 'waiting' | 'in-progress' | 'completed';
  priority: 'normal' | 'urgent';
  notes?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patient: Patient;
  doctor: Doctor;
  appointmentDate: string;
  appointmentTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'front-desk';
}