import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { ProjectType } from '../../projects/projects.enum';
import { ProjectQuestionMapping } from 'src/modules/projects/entities/project-question-mapping.entity';

@Entity('questions')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ProjectType,
  })
  type: ProjectType;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Timestamp;

  // Relations
  @OneToMany(
    () => ProjectQuestionMapping,
    (projectQuestionMapping) => projectQuestionMapping.question,
  )
  questionProject: ProjectQuestionMapping[];
}
