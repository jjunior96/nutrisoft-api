import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findAll(): Promise<Evaluation[]> {
    const evaluations = await this.evaluationRepository.find({
      // where: { patient: { nutritionist: { id: nutritionistId } } },
    });
    return evaluations;
  }

  async findOne(id: string): Promise<Evaluation> {
    const evalution = await this.evaluationRepository.findOne(id);

    if (!evalution) {
      throw new HttpException(
        'Avaliação não encontrada.',
        HttpStatus.NOT_FOUND,
      );
    }
    return evalution;
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
    return evaluation;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    this.evaluationRepository.delete(id);

    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
