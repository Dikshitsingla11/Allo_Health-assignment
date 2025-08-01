import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  patientId: string;

  @IsNotEmpty()
  @IsString()
  doctorId: string;

  @IsNotEmpty()
  @IsDateString()
  appointmentDate: string;

  @IsNotEmpty()
  @IsString()
  appointmentTime: string;

  @IsOptional()
  @IsString()
  notes?: string;
}