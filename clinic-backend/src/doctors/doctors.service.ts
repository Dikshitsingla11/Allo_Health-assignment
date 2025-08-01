import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorsRepository.create(createDoctorDto);
    return this.doctorsRepository.save(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    await this.doctorsRepository.update(id, updateDoctorDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.doctorsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
  }

  async findAvailable(): Promise<Doctor[]> {
    return this.doctorsRepository.find({
      where: { isAvailable: true },
      order: { name: 'ASC' },
    });
  }

  async toggleAvailability(id: string): Promise<Doctor> {
    const doctor = await this.findOne(id);
    doctor.isAvailable = !doctor.isAvailable;
    return this.doctorsRepository.save(doctor);
  }
}
