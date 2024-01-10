import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { IsOptional } from 'class-validator';
import { Progress } from '../../progress/entities/progress.entity';
import { ChatGptHistory } from '../../chat-gpt-history/entities/chat-gpt-history.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  @IsOptional()
  name?: string;

  @Column()
  @IsOptional()
  job_title?: string;

  @Column('text', { array: true })
  @IsOptional()
  tech_stack?: string[];

  @OneToMany(() => Course, (course) => course.user, { onDelete: 'CASCADE' })
  courses: Course[];

  @ManyToOne(() => ChatGptHistory, (chatGptHistory) => chatGptHistory.user)
  @JoinColumn({ name: 'chatGptHistory_id' })
  chatGptHistory: ChatGptHistory[];

  @OneToMany(() => Progress, (progress) => progress.user, {
    onDelete: 'CASCADE',
  })
  progress: Progress[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
