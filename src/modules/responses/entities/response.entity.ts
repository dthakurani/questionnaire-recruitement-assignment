import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProjectQuestionMapping } from 'src/modules/projects/entities/project-question-mapping.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('responses')
export class Response extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'project_question_mapping', type: 'uuid' })
  projectQuestionMappingId: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'value', type: 'json' })
  value: object;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Timestamp;

  // Relations
  @ManyToOne(
    () => ProjectQuestionMapping,
    (projectQuestionMapping) => projectQuestionMapping.id,
  )
  @JoinColumn({ name: 'project_question_mapping' })
  projectQuestionMapping: ProjectQuestionMapping;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
