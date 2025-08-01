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
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const queue_item_entity_1 = require("./entities/queue-item.entity");
const patients_service_1 = require("../patients/patients.service");
let QueueService = class QueueService {
    constructor(queueRepository, patientsService) {
        this.queueRepository = queueRepository;
        this.patientsService = patientsService;
    }
    async addToQueue(addToQueueDto) {
        let patient;
        if (addToQueueDto.patientId) {
            patient = await this.patientsService.findOne(addToQueueDto.patientId);
        }
        else {
            patient = await this.patientsService.create({
                name: addToQueueDto.name,
                phone: addToQueueDto.phone,
                email: addToQueueDto.email,
                dateOfBirth: addToQueueDto.dateOfBirth,
                address: addToQueueDto.address,
                emergencyContact: addToQueueDto.emergencyContact,
            });
        }
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
    async getCurrentQueue() {
        return this.queueRepository.find({
            where: { status: 'waiting' },
            relations: ['patient'],
            order: {
                priority: 'DESC',
                queueNumber: 'ASC'
            },
        });
    }
    async getAllQueue() {
        return this.queueRepository.find({
            relations: ['patient'],
            order: { createdAt: 'DESC' },
        });
    }
    async startTreatment(id) {
        const queueItem = await this.queueRepository.findOne({
            where: { id },
            relations: ['patient'],
        });
        if (!queueItem) {
            throw new common_1.NotFoundException(`Queue item with ID ${id} not found`);
        }
        queueItem.status = 'in-progress';
        return this.queueRepository.save(queueItem);
    }
    async completePatient(id) {
        const queueItem = await this.queueRepository.findOne({
            where: { id },
            relations: ['patient'],
        });
        if (!queueItem) {
            throw new common_1.NotFoundException(`Queue item with ID ${id} not found`);
        }
        queueItem.status = 'completed';
        queueItem.completedAt = new Date();
        return this.queueRepository.save(queueItem);
    }
    async remove(id) {
        const result = await this.queueRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Queue item with ID ${id} not found`);
        }
    }
    async addWalkInToQueue(patientData) {
        const patient = await this.patientsService.create(patientData);
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
};
exports.QueueService = QueueService;
exports.QueueService = QueueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(queue_item_entity_1.QueueItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        patients_service_1.PatientsService])
], QueueService);
//# sourceMappingURL=queue.service.js.map