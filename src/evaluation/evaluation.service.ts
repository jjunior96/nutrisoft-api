import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
  ) {}
  async create(createEvaluationDto: CreateEvaluationDto) {
    const evaluation = await this.evaluationRepository.save({
      ...createEvaluationDto,
    });

    return evaluation;
  }

  async findAll(nutritionistId: string): Promise<Evaluation[]> {
    const evaluations = await this.evaluationRepository.find({
      relations: ['patient', 'patient.nutritionist'],
      where: { patient: { nutritionist: { id: nutritionistId } } },
    });

    return classToClass(evaluations);
  }

  async findOne(id: string): Promise<Evaluation> {
    const evaluation = await this.evaluationRepository.findOne(id);

    if (!evaluation) {
      throw new HttpException(
        'Avaliação não encontrada.',
        HttpStatus.NOT_FOUND,
      );
    }
    return classToClass(evaluation);
  }

  async update(
    id: string,
    updateEvaluationDto: UpdateEvaluationDto,
  ): Promise<Evaluation> {
    const evaluation = await this.findOne(id);

    await this.evaluationRepository.update(id, {
      ...updateEvaluationDto,
    });

    Object.assign(evaluation, { ...updateEvaluationDto });
    return classToClass(evaluation);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    this.evaluationRepository.delete(id);

    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
