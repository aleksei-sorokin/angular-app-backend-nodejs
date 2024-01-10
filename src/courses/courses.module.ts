import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { UserModule } from '../user/user.module';
import { ChatGptHistoryModule } from '../chat-gpt-history/chat-gpt-history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    forwardRef(() => UserModule),
    forwardRef(() => ChatGptHistoryModule),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
