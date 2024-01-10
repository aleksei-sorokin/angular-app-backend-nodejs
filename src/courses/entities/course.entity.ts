import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';
import { IProgram } from '../../types/types';
import { Progress } from '../../progress/entities/progress.entity';
import { ChatGptHistory } from '../../chat-gpt-history/entities/chat-gpt-history.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn({ name: 'course_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Progress, (progress) => progress.course)
  @JoinColumn({ name: 'progress_id' })
  progress: Progress;

  @ManyToOne(() => Category, (category) => category.courses)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => ChatGptHistory, (chatGptHistory) => chatGptHistory.course)
  @JoinColumn({ name: 'chatGptHistory_id' })
  chatGptHistory: ChatGptHistory;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column()
  course_info: string;

  @Column({ type: 'jsonb' })
  program: IProgram[];

  @Column()
  img: string;

  @Column('text', { array: true })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
