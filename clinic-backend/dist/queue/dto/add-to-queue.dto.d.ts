export declare class AddToQueueDto {
    patientId?: string;
    name: string;
    phone: string;
    email?: string;
    dateOfBirth?: string;
    address?: string;
    emergencyContact?: string;
    priority?: 'normal' | 'urgent';
    notes?: string;
}
