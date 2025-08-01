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
exports.QueueController = void 0;
const common_1 = require("@nestjs/common");
const queue_service_1 = require("./queue.service");
const add_to_queue_dto_1 = require("./dto/add-to-queue.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let QueueController = class QueueController {
    constructor(queueService) {
        this.queueService = queueService;
    }
    addToQueue(addToQueueDto) {
        return this.queueService.addToQueue(addToQueueDto);
    }
    addWalkInToQueue(patientData) {
        return this.queueService.addWalkInToQueue(patientData);
    }
    getCurrentQueue() {
        return this.queueService.getCurrentQueue();
    }
    getAllQueue() {
        return this.queueService.getAllQueue();
    }
    startTreatment(id) {
        return this.queueService.startTreatment(id);
    }
    completePatient(id) {
        return this.queueService.completePatient(id);
    }
    remove(id) {
        return this.queueService.remove(id);
    }
};
exports.QueueController = QueueController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_to_queue_dto_1.AddToQueueDto]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "addToQueue", null);
__decorate([
    (0, common_1.Post)('add-walk-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "addWalkInToQueue", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "getCurrentQueue", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "getAllQueue", null);
__decorate([
    (0, common_1.Patch)(':id/start'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "startTreatment", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "completePatient", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "remove", null);
exports.QueueController = QueueController = __decorate([
    (0, common_1.Controller)('queue'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [queue_service_1.QueueService])
], QueueController);
//# sourceMappingURL=queue.controller.js.map