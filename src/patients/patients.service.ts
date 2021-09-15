import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}
  async create(
    createPatientDto: CreatePatientDto,
    nutritionistId: string,
  ): Promise<Patient> {
    const userExists = await this.patientRepository.findOne({
      where: { email: createPatientDto.email },
    });

    if (userExists) {
      throw new HttpException(
        'Email já cadastrado na plataforma.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const patient = await this.patientRepository.save({
      ...createPatientDto,
      nutritionist: nutritionistId,
    });

    return patient;
  }

  async findAll(nutritionistId: string): Promise<Patient[]> {
    const patients = await this.patientRepository.find({
      where: { nutritionist: { id: nutritionistId } },
    });

    return classToClass(patients);
  }

  async findOne(id: string, nutritionistId: string): Promise<Patient> {
    const userExists = await this.patientRepository.findOne(id, {
      where: { nutritionist: { id: nutritionistId } },
    });

    if (!userExists) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    return classToClass(userExists);
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
    nutritionistId: string,
  ) {
    const userExists = await this.patientRepository.findOne(id, {
      where: { nutritionist: { id: nutritionistId } },
    });

    if (!userExists) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.patientRepository.update(id, {
      ...updatePatientDto,
    });

    Object.assign(userExists, { ...updatePatientDto });

    return classToClass(userExists);
  }

  async remove(id: string, nutritionistId: string) {
    const userExists = await this.patientRepository.findOne(id, {
      where: { nutritionist: { id: nutritionistId } },
    });

    if (!userExists) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.patientRepository.delete(id);

    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
