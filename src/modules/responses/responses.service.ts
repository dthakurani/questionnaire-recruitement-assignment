import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { ProjectQuestionMapping } from '../projects/entities/project-question-mapping.entity';
import { CustomException } from 'src/utils/custom-exception';
import { Response } from './entities/response.entity';
import { FindAllResponseDto } from './dto/find-all-response.dto';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(ProjectQuestionMapping)
    private projectQuestionMappingRepository: Repository<ProjectQuestionMapping>,

    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,

    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(user: User, body: CreateResponseDto) {
    const projectQuestionMappingIds = body.values.map(
      (value) => value.projectQuestionMappingId,
    );

    const incorrectProjectQuestionMappings =
      await this.projectQuestionMappingRepository.find({
        where: {
          projectId: body.projectId,
          id: Not(In(projectQuestionMappingIds)),
        },
      });

    if (incorrectProjectQuestionMappings.length > 0) {
      new CustomException().throwHttpError({
        message: 'Some project question mapping are not found!',
        status: HttpStatus.NOT_FOUND,
        errorKey: 'projectQuestionMappingId',
      });
    }

    const responses = body.values.map((value) => {
      const response = new Response();
      response.projectQuestionMappingId = value.projectQuestionMappingId;
      response.value = {
        text: value.text,
        files: value.files,
      };
      return response;
    });

    await this.responsesRepository.save(responses);
  }

  async findAll(user: User, query: FindAllResponseDto) {
    const [responses, project] = await Promise.all([
      this.responsesRepository.find({
        where: {
          userId: user.id,
          projectQuestionMapping: {
            project: {
              id: query.projectId,
            },
          },
        },
        relations: ['projectQuestionMapping.question'],
      }),

      await this.projectsRepository.findOne({
        where: {
          id: query.projectId,
        },
      }),
    ]);

    return {
      data: {
        project,
        responses,
      },
    };
  }
}
