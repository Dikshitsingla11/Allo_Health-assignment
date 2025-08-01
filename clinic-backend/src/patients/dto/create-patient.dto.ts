import { IsNotEmpty, IsEmail, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;
}