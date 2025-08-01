import { IsNotEmpty, IsEmail, IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';

export class AddToQueueDto {
  @IsOptional()
  @IsString()
  patientId?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @IsOptional()
  @IsEnum(['normal', 'urgent'])
  priority?: 'normal' | 'urgent';

  @IsOptional()
  @IsString()
  notes?: string;
}