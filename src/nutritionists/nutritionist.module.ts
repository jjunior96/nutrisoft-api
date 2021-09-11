import { Module } from '@nestjs/common';
import { NutritionistsService } from './nutritionist.service';
import { nutritionistsController } from './nutritionist.controller';

@Module({
  controllers: [nutritionistsController],
  providers: [NutritionistsService],
})
export class nutritionistsModule {}
