import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientsRepository.create(createPatientDto);
    return this.patientsRepository.save(patient);
  }

  async findAll(search?: string): Promise<Patient[]> {
    if (search) {
      return this.patientsRepository.find({
        where: [
          { name: Like(`%${search}%`) },
          { phone: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
        ],
        order: { name: 'ASC' },
      });
    }
    
    return this.patientsRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    await this.patientsRepository.update(id, updatePatientDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.patientsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
}