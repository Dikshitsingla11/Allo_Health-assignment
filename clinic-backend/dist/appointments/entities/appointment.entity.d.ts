import { Patient } from '../../patients/entities/patient.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';
export declare class Appointment {
    id: string;
    patientId: string;
    doctorId: string;
    appointmentDate: string;
    appointmentTime: string;
    status: string;
    notes: string;
    patient: Patient;
    doctor: Doctor;
    createdAt: Date;
    updatedAt: Date;
}
