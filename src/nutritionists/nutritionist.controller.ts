import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { NutritionistsService } from './nutritionist.service';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';
import { Response } from 'express';

@Controller('nutritionists')
export class nutritionistsController {
  constructor(private readonly nutritionistsService: NutritionistsService) {}

  @Post()
  create(@Body() createnutritionistsDto: CreateNutritionistDto) {
    return this.nutritionistsService.create(createnutritionistsDto);
  }

  @Get()
  findAll(@Res() res: Response) {
    try {
      return res.status(201).send();
    } catch (error) {
      return res.status(404).json('Oii');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nutritionistsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatenutritionistsDto: UpdateNutritionistDto,
  ) {
    return this.nutritionistsService.update(+id, updatenutritionistsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nutritionistsService.remove(+id);
  }
}
