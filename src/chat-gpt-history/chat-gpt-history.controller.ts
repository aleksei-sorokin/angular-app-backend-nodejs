import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ChatGptHistoryService } from './chat-gpt-history.service';
import { CreateChatGptHistoryDto } from './dto/create-chat-gpt-history.dto';
import { UpdateChatGptHistoryDto } from './dto/update-chat-gpt-history.dto';

@Controller('chat-gpt')
export class ChatGptHistoryController {
  constructor(private readonly chatGptHistoryService: ChatGptHistoryService) {}

  @Post()
  create(@Body() createChatGptHistoryDto: CreateChatGptHistoryDto) {
    return this.chatGptHistoryService.create(createChatGptHistoryDto);
  }

  @Get()
  findOne(
    @Query('user_id') user_id: number,
    @Query('course_id') course_id: number,
    @Query('lesson_id') lesson_id: number,
  ) {
    return this.chatGptHistoryService.findOne(+user_id, +course_id, +lesson_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatGptHistoryDto: UpdateChatGptHistoryDto,
  ) {
    return this.chatGptHistoryService.update(
      +id,
      updateChatGptHistoryDto,
      'user',
    );
  }
}
