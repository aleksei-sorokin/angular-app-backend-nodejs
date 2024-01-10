import { IsNotEmpty, IsOptional } from 'class-validator';
import { Course } from '../../courses/entities/course.entity';

export class CreateCategoryDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  courses?: Course;
}
