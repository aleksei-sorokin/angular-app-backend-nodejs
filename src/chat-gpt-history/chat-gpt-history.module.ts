import { forwardRef, Module } from '@nestjs/common';
import { ChatGptHistoryService } from './chat-gpt-history.service';
import { ChatGptHistoryController } from './chat-gpt-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGptHistory } from './entities/chat-gpt-history.entity';
import { UserModule } from '../user/user.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatGptHistory]),
    forwardRef(() => UserModule),
    forwardRef(() => CoursesModule),
  ],
  controllers: [ChatGptHistoryController],
  providers: [ChatGptHistoryService],
})
export class ChatGptHistoryModule {}
