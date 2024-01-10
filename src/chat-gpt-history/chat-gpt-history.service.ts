import { Injectable } from '@nestjs/common';
import { CreateChatGptHistoryDto } from './dto/create-chat-gpt-history.dto';
import { UpdateChatGptHistoryDto } from './dto/update-chat-gpt-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatGptHistory } from './entities/chat-gpt-history.entity';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class ChatGptHistoryService {
  openai = new OpenAI({
    organization: this.configService.get('OPEN_AI_ORGANIZATION'),
    apiKey: this.configService.get('OPEN_AI_KEY'),
  });

  constructor(
    @InjectRepository(ChatGptHistory)
    private readonly chatGptRepository: Repository<ChatGptHistory>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly courseService: CoursesService,
  ) {}

  async create(createChatGptHistoryDto: CreateChatGptHistoryDto) {
    const newChat = {
      user: await this.userService.findOneById(
        +createChatGptHistoryDto.user_id,
      ),
      course: await this.courseService.findOneById(
        +createChatGptHistoryDto.course_id,
      ),
      lesson_id: createChatGptHistoryDto.lesson_id,
      messages: [],
    };
    return await this.chatGptRepository.save(newChat);
  }

  async findOne(user_id: number, course_id: number, lesson_id: number) {
    return await this.chatGptRepository.findOne({
      where: {
        user: { id: user_id },
        course: { id: course_id },
        lesson_id: lesson_id,
      },
    });
  }

  async update(
    id: number,
    updateChatGptHistoryDto: UpdateChatGptHistoryDto,
    user: 'user' | 'chat',
  ) {
    const chat = await this.chatGptRepository.findOne({
      where: { id },
    });
    const newMessage = {
      author: user,
      message: updateChatGptHistoryDto.message,
    };
    const answer = {
      author: 'AI',
      message: await this.getModelAnswer(newMessage.message),
    };

    chat.messages.push(newMessage, answer);
    await this.chatGptRepository.update(id, chat);
    return chat;
  }

  async getModelAnswer(content: string) {
    const resp = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are professional front end developer working with angular and javascript. Give me detailed answer to my question.',
        },
        {
          role: 'user',
          content,
        },
      ],
      stream: false,
    });

    return resp.choices[0].message.content;
  }
}
