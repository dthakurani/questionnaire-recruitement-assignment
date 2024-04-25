import { ProjectType } from '../../../modules/projects/projects.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectQuestionMapping } from './project-question-mapping.entity';
import { User } from '../../../modules/users/entities/user.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ name: 'user_id' })
  userId: string;

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
    (projectQuestionMapping) => projectQuestionMapping.project,
  )
  projectQuestions: ProjectQuestionMapping[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
