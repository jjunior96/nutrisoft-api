import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';
import { Nutritionist } from './entities/nutritionist.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class NutritionistsService {
  constructor(
    @InjectRepository(Nutritionist)
    private readonly nutritionistRepository: Repository<Nutritionist>,
  ) {}
  async create(createNutritionistDto: CreateNutritionistDto) {
    const userExists = await this.nutritionistRepository.findOne({
      where: { email: createNutritionistDto.email },
    });

    if (userExists) {
      throw new HttpException(
        'Email já cadastrado na plataforma.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordHash = await bcrypt.hash(createNutritionistDto.password, 10);

    const nutritionist = await this.nutritionistRepository.save({
      ...createNutritionistDto,
      password: passwordHash,
    });

    return classToClass(nutritionist);
  }

  async findAll(): Promise<Nutritionist[]> {
    const nutritionists = await this.nutritionistRepository.find();

    return classToClass(nutritionists);
  }

  async findOne(id: string): Promise<Nutritionist> {
    const userExists = await this.nutritionistRepository.findOne(id);

    if (!userExists) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    return classToClass(userExists);
  }

  async findByEmail(email: string): Promise<Nutritionist> {
    const userExists = await this.nutritionistRepository.findOne({
      where: { email: email },
    });

    if (!userExists) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    return userExists;
  }

  async update(
    id: string,
    updateNutritionistDto: UpdateNutritionistDto,
  ): Promise<Nutritionist> {
    const userExists = await this.nutritionistRepository.findOne(id);

    if (!userExists) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.nutritionistRepository.update(id, {
      ...updateNutritionistDto,
    });

    Object.assign(userExists, { ...updateNutritionistDto });

    return classToClass(userExists);
  }

  async remove(id: string): Promise<void> {
    const userExists = await this.nutritionistRepository.findOne(id);

    if (!userExists) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.nutritionistRepository.delete(id);

    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
