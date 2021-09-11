import { Test, TestingModule } from '@nestjs/testing';
import { nutritionistsController } from './nutritionist.controller';
import { NutritionistsService } from './nutritionist.service';

describe('nutritionistsController', () => {
  let controller: nutritionistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [nutritionistsController],
      providers: [NutritionistsService],
    }).compile();

    controller = module.get<nutritionistsController>(nutritionistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
