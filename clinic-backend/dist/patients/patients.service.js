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
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_entity_1 = require("./entities/patient.entity");
let PatientsService = class PatientsService {
    constructor(patientsRepository) {
        this.patientsRepository = patientsRepository;
    }
    async create(createPatientDto) {
        const patient = this.patientsRepository.create(createPatientDto);
        return this.patientsRepository.save(patient);
    }
    async findAll(search) {
        if (search) {
            return this.patientsRepository.find({
                where: [
                    { name: (0, typeorm_2.Like)(`%${search}%`) },
                    { phone: (0, typeorm_2.Like)(`%${search}%`) },
                    { email: (0, typeorm_2.Like)(`%${search}%`) },
                ],
                order: { name: 'ASC' },
            });
        }
        return this.patientsRepository.find({
            order: { name: 'ASC' },
        });
    }
    async findOne(id) {
        const patient = await this.patientsRepository.findOne({ where: { id } });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        }
        return patient;
    }
    async update(id, updatePatientDto) {
        await this.patientsRepository.update(id, updatePatientDto);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.patientsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        }
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PatientsService);
//# sourceMappingURL=patients.service.js.map