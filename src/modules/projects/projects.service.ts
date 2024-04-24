import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, ILike, Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Project } from './entities/project.entity';
import { Question } from 'src/modules/questions/entities/question.entity';
import { ProjectQuestionMapping } from './entities/project-question-mapping.entity';
import { FindAllProjectDto } from './dto/find-all-project.dto';
import { CustomException } from 'src/utils/custom-exception';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,

    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,

    @InjectRepository(ProjectQuestionMapping)
    private readonly projectQuestionMappingRepository: Repository<ProjectQuestionMapping>,

    private entityManager: EntityManager,
  ) {}
  async create(user: User, body: CreateProjectDto) {
    const data = await this.entityManager.transaction(async (entityManager) => {
      const projectExists = await this.projectsRepository.findOne({
        where: {
          name: ILike(body.name),
          type: body.type,
        },
      });

      if (projectExists) {
        new CustomException().throwHttpError({
          message: 'Project already exists!',
          status: HttpStatus.CONFLICT,
          errorKey: 'name,type',
        });
      }

      const project = await this.projectsRepository.save({
        ...body,
        userId: user.id,
      });

      const questions = await this.questionsRepository.find({
        where: {
          type: body.type,
        },
        select: ['id'],
      });

      // Select random questions
      const numberOfQuestions = Math.floor(Math.random() * (10 - 3 + 1)) + 3;

      const selectedQuestions = questions.slice(
        0,
        Math.min(numberOfQuestions, questions.length),
      );

      await this.projectQuestionMappingRepository.find();

      const projectQuestions = selectedQuestions.map((question) => {
        return this.projectQuestionMappingRepository.create({
          projectId: project.id,
          questionId: question.id,
        });
      });

      await entityManager.save(projectQuestions);

      return project;
    });

    return data;
  }

  async findAll(query: FindAllProjectDto) {
    const whereQuery = {};

    if (query.type) {
      whereQuery['type'] = query.type;
    }
    const projects = await this.projectsRepository.find({
      where: whereQuery,
      select: ['id', 'name', 'city', 'type'],
    });

    return projects;
  }

  async findOne(id: string) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        type: true,
        user: {
          id: true,
          name: true,
          email: true,
        },
        projectQuestions: {
          id: true,
          question: {
            id: true,
            description: true,
            type: true,
          },
        },
      },
      relations: ['user', 'projectQuestions.question'],
    });

    return project;
  }
}
