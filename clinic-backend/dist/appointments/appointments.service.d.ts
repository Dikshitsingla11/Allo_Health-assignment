import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PatientsService } from '../patients/patients.service';
import { DoctorsService } from '../doctors/doctors.service';
export declare class AppointmentsService {
    private appointmentsRepository;
    private patientsService;
    private doctorsService;
    constructor(appointmentsRepository: Repository<Appointment>, patientsService: PatientsService, doctorsService: DoctorsService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    findAll(date?: string): Promise<Appointment[]>;
    findOne(id: string): Promise<Appointment>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    remove(id: string): Promise<void>;
    cancel(id: string): Promise<Appointment>;
    complete(id: string): Promise<Appointment>;
}
