import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column()
  doctorId: string;

  @Column({ type: 'date' })
  appointmentDate: string;

  @Column({ type: 'time' })
  appointmentTime: string;

  @Column({ type: 'enum', enum: ['scheduled', 'completed', 'cancelled', 'no-show'], default: 'scheduled' })
  status: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => Patient, patient => patient.appointments)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @ManyToOne(() => Doctor, doctor => doctor.appointments)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}