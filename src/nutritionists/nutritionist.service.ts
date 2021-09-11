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
  async create(createnutritionistsDto: CreateNutritionistDto) {
    const nutritionist = await this.nutritionistRepository.save({
      name: 'Igor Rodrigues',
      email: 'igor@mail.com',
      password: '123456',
      phone: '66 9 9999-9999',
    });
    return 'This action adds a new nutritionists';
  }

  async findAll(): Promise<Nutritionist[]> {
    const nutritionists = await this.nutritionistRepository.find();

    return nutritionists;
  }

  findOne(id: number) {
    return `This action returns a #${id} nutritionists`;
  }

  update(id: number, updatenutritionistsDto: UpdateNutritionistDto) {
    return `This action updates a #${id} nutritionists`;
  }

  remove(id: number) {
    return `This action removes a #${id} nutritionists`;
  }
}
