"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const patients_service_1 = require("../patients/patients.service");
const doctors_service_1 = require("../doctors/doctors.service");
let AppointmentsService = class AppointmentsService {
    constructor(appointmentsRepository, patientsService, doctorsService) {
        this.appointmentsRepository = appointmentsRepository;
        this.patientsService = patientsService;
        this.doctorsService = doctorsService;
    }
    async create(createAppointmentDto) {
        await this.patientsService.findOne(createAppointmentDto.patientId);
        await this.doctorsService.findOne(createAppointmentDto.doctorId);
        const existingAppointment = await this.appointmentsRepository.findOne({
            where: {
                doctorId: createAppointmentDto.doctorId,
                appointmentDate: createAppointmentDto.appointmentDate,
                appointmentTime: createAppointmentDto.appointmentTime,
                status: 'scheduled',
            },
        });
        if (existingAppointment) {
            throw new common_1.BadRequestException('Doctor is not available at this time');
        }
        const appointment = this.appointmentsRepository.create(createAppointmentDto);
        const savedAppointment = await this.appointmentsRepository.save(appointment);
        return this.findOne(savedAppointment.id);
    }
    async findAll(date) {
        const query = this.appointmentsRepository.createQueryBuilder('appointment')
            .leftJoinAndSelect('appointment.patient', 'patient')
            .leftJoinAndSelect('appointment.doctor', 'doctor')
            .orderBy('appointment.appointmentTime', 'ASC');
        if (date) {
            query.where('appointment.appointmentDate = :date', { date });
        }
        return query.getMany();
    }
    async findOne(id) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { id },
            relations: ['patient', 'doctor'],
        });
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        return appointment;
    }
    async update(id, updateAppointmentDto) {
        const appointment = await this.findOne(id);
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
                throw new common_1.BadRequestException('Doctor is not available at this time');
            }
        }
        await this.appointmentsRepository.update(id, updateAppointmentDto);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.appointmentsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
    }
    async cancel(id) {
        return this.update(id, { status: 'cancelled' });
    }
    async complete(id) {
        return this.update(id, { status: 'completed' });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        patients_service_1.PatientsService,
        doctors_service_1.DoctorsService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map