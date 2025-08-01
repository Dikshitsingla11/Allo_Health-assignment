import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
export declare class DoctorsService {
    private doctorsRepository;
    constructor(doctorsRepository: Repository<Doctor>);
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    findAll(): Promise<Doctor[]>;
    findOne(id: string): Promise<Doctor>;
    update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;
    remove(id: string): Promise<void>;
    findAvailable(): Promise<Doctor[]>;
    toggleAvailability(id: string): Promise<Doctor>;
}
