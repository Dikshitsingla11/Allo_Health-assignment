import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../users/entities/user.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';
import { Patient } from '../../patients/entities/patient.entity';

export async function seedDatabase(dataSource: DataSource) {
  console.log('🌱 Seeding database...');

  // Create default admin user
  const userRepository = dataSource.getRepository(User);
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = userRepository.create({
    email: 'admin@clinic.com',
    password: hashedPassword,
    name: 'Admin User',
    role: 'admin',
  });
  
  await userRepository.save(adminUser);

  // Create front desk user
  const frontDeskPassword = await bcrypt.hash('frontdesk123', 10);
  const frontDeskUser = userRepository.create({
    email: 'frontdesk@clinic.com',
    password: frontDeskPassword,
    name: 'Front Desk Staff',
    role: 'front-desk',
  });
  
  await userRepository.save(frontDeskUser);

  // Create sample doctors
  const doctorRepository = dataSource.getRepository(Doctor);
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

  // Create sample patients
  const patientRepository = dataSource.getRepository(Patient);
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
