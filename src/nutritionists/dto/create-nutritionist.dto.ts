import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateNutritionistDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsString()
  readonly password: string;
}
