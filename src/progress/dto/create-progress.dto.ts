import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProgressDto {
  @IsNotEmpty()
  current_lesson_id: number = 0;
}
