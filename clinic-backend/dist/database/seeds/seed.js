"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const bcrypt = require("bcryptjs");
const user_entity_1 = require("../../users/entities/user.entity");
const doctor_entity_1 = require("../../doctors/entities/doctor.entity");
const patient_entity_1 = require("../../patients/entities/patient.entity");
async function seedDatabase(dataSource) {
    console.log('🌱 Seeding database...');
    const userRepository = dataSource.getRepository(user_entity_1.User);
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = userRepository.create({
        email: 'admin@clinic.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
    });
    await userRepository.save(adminUser);
    const frontDeskPassword = await bcrypt.hash('frontdesk123', 10);
    const frontDeskUser = userRepository.create({
        email: 'frontdesk@clinic.com',
        password: frontDeskPassword,
        name: 'Front Desk Staff',
        role: 'front-desk',
    });
    await userRepository.save(frontDeskUser);
    const doctorRepository = dataSource.getRepository(doctor_entity_1.Doctor);
    const doctors = [
        {
            name: 'Sarah Wilson',
            specialization: 'General Practice',
            phone: '+1 (555) 999-1111',
            email: 'dr.wilson@clinic.com',
            schedule: 'Mon-Fri 9AM-5PM',
            isAvailable: true,
        },
        {
            name: 'Michael Chen',
            specialization: 'Pediatrics',
            phone: '+1 (555) 999-2222',
            email: 'dr.chen@clinic.com',
            schedule: 'Tue-Sat 8AM-4PM',
            isAvailable: true,
        },
        {
            name: 'Emily Rodriguez',
            specialization: 'Cardiology',
            phone: '+1 (555) 999-3333',
            email: 'dr.rodriguez@clinic.com',
            schedule: 'Mon-Wed-Fri 10AM-6PM',
            isAvailable: false,
        },
    ];
    for (const doctorData of doctors) {
        const doctor = doctorRepository.create(doctorData);
        await doctorRepository.save(doctor);
    }
    const patientRepository = dataSource.getRepository(patient_entity_1.Patient);
    const patients = [
        {
            name: 'Alice Johnson',
            phone: '+1 (555) 111-2222',
            email: 'alice@example.com',
            dateOfBirth: '1988-05-10',
            address: '123 Main St, City, ST 12345',
            emergencyContact: '+1 (555) 111-3333',
        },
        {
            name: 'Bob Smith',
            phone: '+1 (555) 333-4444',
            email: 'bob@example.com',
            dateOfBirth: '1975-12-03',
            address: '456 Oak Ave, City, ST 12345',
            emergencyContact: '+1 (555) 333-5555',
        },
        {
            name: 'Carol Davis',
            phone: '+1 (555) 777-8888',
            email: 'carol@example.com',
            dateOfBirth: '1992-08-22',
            address: '789 Pine Rd, City, ST 12345',
            emergencyContact: '+1 (555) 777-9999',
        },
    ];
    for (const patientData of patients) {
        const patient = patientRepository.create(patientData);
        await patientRepository.save(patient);
    }
    console.log('✅ Database seeded successfully!');
    console.log('👤 Admin login: admin@clinic.com / admin123');
    console.log('👤 Front desk login: frontdesk@clinic.com / frontdesk123');
}
//# sourceMappingURL=seed.js.map