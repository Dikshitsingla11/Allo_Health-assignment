"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/entities/user.entity");
const doctor_entity_1 = require("../doctors/entities/doctor.entity");
const patient_entity_1 = require("../patients/entities/patient.entity");
const appointment_entity_1 = require("../appointments/entities/appointment.entity");
const queue_item_entity_1 = require("../queue/entities/queue-item.entity");
let DatabaseConfig = class DatabaseConfig {
    createTypeOrmOptions() {
        return {
            type: 'mysql',
            host: process.env.DATABASE_HOST || 'localhost',
            port: parseInt(process.env.DATABASE_PORT) || 3306,
            username: process.env.DATABASE_USERNAME || 'root',
            password: process.env.DATABASE_PASSWORD || 'dikshit22',
            database: process.env.DATABASE_NAME || 'cline_db',
            entities: [user_entity_1.User, doctor_entity_1.Doctor, patient_entity_1.Patient, appointment_entity_1.Appointment, queue_item_entity_1.QueueItem],
            synchronize: process.env.NODE_ENV === 'development',
            logging: process.env.NODE_ENV === 'development',
        };
    }
};
exports.DatabaseConfig = DatabaseConfig;
exports.DatabaseConfig = DatabaseConfig = __decorate([
    (0, common_1.Injectable)()
], DatabaseConfig);
//# sourceMappingURL=database.config.js.map