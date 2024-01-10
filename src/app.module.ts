import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Course } from './courses/entities/course.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { ProgressModule } from './progress/progress.module';
import { ChatGptHistoryModule } from './chat-gpt-history/chat-gpt-history.module';

@Module({
  imports: [
    UserModule,
    CoursesModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [User, Course, Category],
      }),
      inject: [ConfigService],
    }),
    CategoryModule,
    ProgressModule,
    ChatGptHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
