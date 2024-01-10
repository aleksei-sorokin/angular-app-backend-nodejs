import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';
import { IProgram } from '../../types/types';
import { Progress } from '../../progress/entities/progress.entity';

export class CreateCourseDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  course_info: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  img?: string;

  @IsNotEmpty()
  program?: IProgram[];

  @IsOptional()
  tags: string[];

  @IsOptional()
  progress?: Progress;

  @IsOptional()
  category?: Category;
}
