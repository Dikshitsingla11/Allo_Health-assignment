import { IsNotEmpty, IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  specialization: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  schedule: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}