import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueItem } from './entities/queue-item.entity';
import { AddToQueueDto } from './dto/add-to-queue.dto';
import { PatientsService } from '../patients/patients.service';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueItem)
    private queueRepository: Repository<QueueItem>,
    private patientsService: PatientsService,
  ) {}

  async addToQueue(addToQueueDto: AddToQueueDto): Promise<QueueItem> {
    // Create patient if new, or find existing
    let patient;
    if (addToQueueDto.patientId) {
      patient = await this.patientsService.findOne(addToQueueDto.patientId);
    } else {
      // Create new patient
      patient = await this.patientsService.create({
        name: addToQueueDto.name,
        phone: addToQueueDto.phone,
        email: addToQueueDto.email,
        dateOfBirth: addToQueueDto.dateOfBirth,
        address: addToQueueDto.address,
        emergencyContact: addToQueueDto.emergencyContact,
      });
    }

    // Get next queue number
    const lastQueueItem = await this.queueRepository.findOne({
      where: { status: 'waiting' },
      order: { queueNumber: 'DESC' },
    });

    const queueNumber = lastQueueItem ? lastQueueItem.queueNumber + 1 : 1;

    const queueItem = this.queueRepository.create({
      patientId: patient.id,
      queueNumber,
      priority: addToQueueDto.priority || 'normal',
      notes: addToQueueDto.notes,
    });

    return this.queueRepository.save(queueItem);
  }

  async getCurrentQueue(): Promise<QueueItem[]> {
    return this.queueRepository.find({
      where: { status: 'waiting' },
      relations: ['patient'],
      order: { 
        priority: 'DESC', // urgent first
        queueNumber: 'ASC' 
      },
    });
  }

  async getAllQueue(): Promise<QueueItem[]> {
    return this.queueRepository.find({
      relations: ['patient'],
      order: { createdAt: 'DESC' },
    });
  }

  async startTreatment(id: string): Promise<QueueItem> {
    const queueItem = await this.queueRepository.findOne({
      where: { id },
      relations: ['patient'],
    });

    if (!queueItem) {
      throw new NotFoundException(`Queue item with ID ${id} not found`);
    }

    queueItem.status = 'in-progress';
    return this.queueRepository.save(queueItem);
  }

  async completePatient(id: string): Promise<QueueItem> {
    const queueItem = await this.queueRepository.findOne({
      where: { id },
      relations: ['patient'],
    });

    if (!queueItem) {
      throw new NotFoundException(`Queue item with ID ${id} not found`);
    }

    queueItem.status = 'completed';
    queueItem.completedAt = new Date();
    return this.queueRepository.save(queueItem);
  }

  async remove(id: string): Promise<void> {
    const result = await this.queueRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Queue item with ID ${id} not found`);
    }
  }

  async addWalkInToQueue(patientData: any): Promise<QueueItem> {
    // Create new patient
    const patient = await this.patientsService.create(patientData);

    // Get next queue number
    const lastQueueItem = await this.queueRepository.findOne({
      where: { status: 'waiting' },
      order: { queueNumber: 'DESC' },
    });

    const queueNumber = lastQueueItem ? lastQueueItem.queueNumber + 1 : 1;

    const queueItem = this.queueRepository.create({
      patientId: patient.id,
      queueNumber,
      priority: patientData.priority || 'normal',
      notes: patientData.notes,
      patient: patient,
    });

    return this.queueRepository.save(queueItem);
  }
}
