import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  password: string;

  @IsString()
  @MaxLength(1, { message: 'Insert M or F' })
  gender: 'M' | 'F';

  @IsNumber({ maxDecimalPlaces: 3 })
  age: number;

  @IsNumber()
  activity_factor: number;

  @IsNumber({ maxDecimalPlaces: 3 })
  weight: number;

  @IsNumber({ maxDecimalPlaces: 3 })
  height: number;
}
