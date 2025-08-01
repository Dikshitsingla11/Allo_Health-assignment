import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PatientsService } from '../patients/patients.service';
import { DoctorsService } from '../doctors/doctors.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    // Verify patient and doctor exist
    await this.patientsService.findOne(createAppointmentDto.patientId);
    await this.doctorsService.findOne(createAppointmentDto.doctorId);

    // Check for conflicts
    const existingAppointment = await this.appointmentsRepository.findOne({
      where: {
        doctorId: createAppointmentDto.doctorId,
        appointmentDate: createAppointmentDto.appointmentDate,
        appointmentTime: createAppointmentDto.appointmentTime,
        status: 'scheduled',
      },
    });

    if (existingAppointment) {
      throw new BadRequestException('Doctor is not available at this time');
    }

    const appointment = this.appointmentsRepository.create(createAppointmentDto);
    const savedAppointment = await this.appointmentsRepository.save(appointment);
    return this.findOne(savedAppointment.id);
  }

  async findAll(date?: string): Promise<Appointment[]> {
    const query = this.appointmentsRepository.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .orderBy('appointment.appointmentTime', 'ASC');

    if (date) {
      query.where('appointment.appointmentDate = :date', { date });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor'],
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);

    // If updating doctor, date, or time, check for conflicts
    if (updateAppointmentDto.doctorId || updateAppointmentDto.appointmentDate || updateAppointmentDto.appointmentTime) {
      const doctorId = updateAppointmentDto.doctorId || appointment.doctorId;
      const appointmentDate = updateAppointmentDto.appointmentDate || appointment.appointmentDate;
      const appointmentTime = updateAppointmentDto.appointmentTime || appointment.appointmentTime;

      const existingAppointment = await this.appointmentsRepository.findOne({
        where: {
          doctorId,
          appointmentDate,
          appointmentTime,
          status: 'scheduled',
        },
      });

      if (existingAppointment && existingAppointment.id !== id) {
        throw new BadRequestException('Doctor is not available at this time');
      }
    }

    await this.appointmentsRepository.update(id, updateAppointmentDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.appointmentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }

  async cancel(id: string): Promise<Appointment> {
    return this.update(id, { status: 'cancelled' });
  }

  async complete(id: string): Promise<Appointment> {
    return this.update(id, { status: 'completed' });
  }
}
