import { IsNotEmpty } from 'class-validator';

export class CreateChatGptHistoryDto {
  @IsNotEmpty()
  lesson_id: number;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  course_id: number;
}
