import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';
import { Nutritionist } from './entities/nutritionist.entity';

@Injectable()
export class NutritionistsService {
  constructor(
    @InjectRepository(Nutritionist)
    private readonly nutritionistRepository: Repository<Nutritionist>,
  ) {}
  async create(createNutritionistDto: CreateNutritionistDto) {
    const nutritionist = await this.nutritionistRepository.save({
      name: 'Igor Rodrigues',
      email: 'igorsteixeira94@gmail.com',
      password: '123456',
      phone: '66 9 9999-9999',
    });

    return nutritionist;
  }

  async findAll(): Promise<Nutritionist[]> {
    const nutritionists = await this.nutritionistRepository.find();
    return nutritionists;
  }

  findOne(id: number) {
    return `This action returns a #${id} nutritionist`;
  }

  update(id: number, updateNutritionistDto: UpdateNutritionistDto) {
    return `This action updates a #${id} nutritionist`;
  }

  remove(id: number) {
    return `This action removes a #${id} nutritionist`;
  }
}
