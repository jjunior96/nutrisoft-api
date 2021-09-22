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
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { IRequest } from '../interfaces/IRequestUser';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createEvaluationDto: CreateEvaluationDto,
    @Request() req: IRequest,
  ) {
    return this.evaluationService.create(createEvaluationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: IRequest) {
    return this.evaluationService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.evaluationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationService.update(id, updateEvaluationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.evaluationService.remove(id);
  }
}
