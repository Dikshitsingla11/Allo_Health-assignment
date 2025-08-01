import { Appointment } from '../../appointments/entities/appointment.entity';
import { QueueItem } from '../../queue/entities/queue-item.entity';
export declare class Patient {
    id: string;
    name: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    address: string;
    emergencyContact: string;
    appointments: Appointment[];
    queueItems: QueueItem[];
    createdAt: Date;
    updatedAt: Date;
}
