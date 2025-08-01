import { Appointment } from '../../appointments/entities/appointment.entity';
export declare class Doctor {
    id: string;
    name: string;
    specialization: string;
    phone: string;
    email: string;
    schedule: string;
    isAvailable: boolean;
    appointments: Appointment[];
    createdAt: Date;
    updatedAt: Date;
}
