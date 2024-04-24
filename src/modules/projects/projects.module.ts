import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Project } from './entities/project.entity';
import { Question } from 'src/modules/questions/entities/question.entity';
import { ProjectQuestionMapping } from './entities/project-question-mapping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Project, Question, ProjectQuestionMapping]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
