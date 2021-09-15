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
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { IRequest } from '../interfaces/IRequestUser';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPatientDto: CreatePatientDto, @Request() req: IRequest) {
    return this.patientsService.create(createPatientDto, req.user?.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: IRequest) {
    return this.patientsService.findAll(req.user?.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req: IRequest) {
    return this.patientsService.findOne(id, req.user?.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @Request() req: IRequest,
  ) {
    return this.patientsService.update(id, updatePatientDto, req.user?.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req: IRequest) {
    return this.patientsService.remove(id, req.user?.id);
  }
}
