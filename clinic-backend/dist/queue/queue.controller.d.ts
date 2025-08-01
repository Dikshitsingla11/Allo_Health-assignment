import { QueueService } from './queue.service';
import { AddToQueueDto } from './dto/add-to-queue.dto';
export declare class QueueController {
    private readonly queueService;
    constructor(queueService: QueueService);
    addToQueue(addToQueueDto: AddToQueueDto): Promise<import("./entities/queue-item.entity").QueueItem>;
    addWalkInToQueue(patientData: any): Promise<import("./entities/queue-item.entity").QueueItem>;
    getCurrentQueue(): Promise<import("./entities/queue-item.entity").QueueItem[]>;
    getAllQueue(): Promise<import("./entities/queue-item.entity").QueueItem[]>;
    startTreatment(id: string): Promise<import("./entities/queue-item.entity").QueueItem>;
    completePatient(id: string): Promise<import("./entities/queue-item.entity").QueueItem>;
    remove(id: string): Promise<void>;
}
