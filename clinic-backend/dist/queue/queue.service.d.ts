import { Repository } from 'typeorm';
import { QueueItem } from './entities/queue-item.entity';
import { AddToQueueDto } from './dto/add-to-queue.dto';
import { PatientsService } from '../patients/patients.service';
export declare class QueueService {
    private queueRepository;
    private patientsService;
    constructor(queueRepository: Repository<QueueItem>, patientsService: PatientsService);
    addToQueue(addToQueueDto: AddToQueueDto): Promise<QueueItem>;
    getCurrentQueue(): Promise<QueueItem[]>;
    getAllQueue(): Promise<QueueItem[]>;
    startTreatment(id: string): Promise<QueueItem>;
    completePatient(id: string): Promise<QueueItem>;
    remove(id: string): Promise<void>;
    addWalkInToQueue(patientData: any): Promise<QueueItem>;
}
