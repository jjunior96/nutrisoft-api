import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NutritionistsService } from './nutritionists.service';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { IRequest } from '../interfaces/IRequestUser';

@Controller('nutritionists')
export class NutritionistsController {
  constructor(private readonly nutritionistsService: NutritionistsService) {}

  @Post()
  create(@Body() createNutritionistDto: CreateNutritionistDto) {
    return this.nutritionistsService.create(createNutritionistDto);
  }

  @Get()
  findAll() {
    return this.nutritionistsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req: IRequest) {
    return this.nutritionistsService.findOne(req?.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNutritionistDto: UpdateNutritionistDto,
  ) {
    return this.nutritionistsService.update(id, updateNutritionistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nutritionistsService.remove(id);
  }
}
