import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Session } from './session.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  created_at: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updated_at: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Timestamp;

  // Relations

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
