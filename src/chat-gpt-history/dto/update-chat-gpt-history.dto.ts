import { PartialType } from '@nestjs/mapped-types';
import { CreateChatGptHistoryDto } from './create-chat-gpt-history.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateChatGptHistoryDto extends PartialType(
  CreateChatGptHistoryDto,
) {
  @IsNotEmpty()
  message: string;
}
