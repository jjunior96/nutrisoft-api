import { IsDecimal, IsInt, IsNumber } from 'class-validator';

export class CreateEvaluationDto {
  @IsNumber({ maxDecimalPlaces: 3 })
  desired_weight: number;

  @IsInt()
  target: number;

  @IsInt()
  classification_group: number;

  patient: string;

  created_at: Date;

  updated_at: Date;
}
