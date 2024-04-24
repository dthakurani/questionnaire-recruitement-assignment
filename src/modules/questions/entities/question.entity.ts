import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { QuestionType } from '../question.enum';

@Entity('questions')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Timestamp;
}
