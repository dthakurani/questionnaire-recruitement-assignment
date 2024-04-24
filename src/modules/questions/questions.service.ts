import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { FindAllQuestionDto } from './dto/find-all-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
  ) {}

  async findAll(query: FindAllQuestionDto) {
    const whereQuery = {};

    if (query.type) {
      whereQuery['type'] = query.type;
    }
    const questions = await this.questionsRepository.find({
      where: whereQuery,
      select: ['id', 'description', 'type'],
    });

    return questions;
  }
}
