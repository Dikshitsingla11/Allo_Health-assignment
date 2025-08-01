import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';

@Entity('queue_items')
export class QueueItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column()
  queueNumber: number;

  @Column({ type: 'enum', enum: ['waiting', 'in-progress', 'completed'], default: 'waiting' })
  status: string;

  @Column({ type: 'enum', enum: ['normal', 'urgent'], default: 'normal' })
  priority: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  completedAt: Date;

  @ManyToOne(() => Patient, patient => patient.queueItems)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}