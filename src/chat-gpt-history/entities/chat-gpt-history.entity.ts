import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { IMessagesIA } from '../../types/types';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class ChatGptHistory {
  @PrimaryGeneratedColumn({ name: 'chatGptHistory_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.chatGptHistory)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Course, (course) => course.chatGptHistory)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ type: 'json' })
  messages: IMessagesIA[];

  @Column()
  lesson_id: number;
}
