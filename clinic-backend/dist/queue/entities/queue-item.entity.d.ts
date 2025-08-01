import { Patient } from '../../patients/entities/patient.entity';
export declare class QueueItem {
    id: string;
    patientId: string;
    queueNumber: number;
    status: string;
    priority: string;
    notes: string;
    completedAt: Date;
    patient: Patient;
    createdAt: Date;
    updatedAt: Date;
}
