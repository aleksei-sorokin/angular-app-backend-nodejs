import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { In, Like, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { toSlug } from '../utils/slug';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly userService: UserService,
  ) {}

  async create(createCourseDto: CreateCourseDto, user_email: string) {
    let slug = toSlug(createCourseDto.title);
    const author = await this.userService.findOne(user_email);
    const isExist = await this.courseRepository.findBy({
      slug,
    });

    if (isExist.length) slug = isExist[0].slug + '-1';

    const newCourse = {
      ...createCourseDto,
      slug,
      user: author,
    };
    return await this.courseRepository.save(newCourse);
  }

  async findAll() {
    return await this.courseRepository.find({
      where: {},
      relations: {
        category: true,
        user: true,
        progress: true,
        chatGptHistory: true,
      },
    });
  }

  async search(
    title: string,
    page: number,
    limit: number,
    categoryId: number[],
  ) {
    const count = !title.length
      ? await this.courseRepository.count()
      : await this.courseRepository.countBy({ title: Like(`%${title}%`) });

    const categoryCondition = categoryId &&
      categoryId.length > 0 && {
        category: {
          id: In(categoryId),
        },
      };

    return {
      count,
      data: await this.courseRepository.find({
        where: { title: Like(`%${title}%`), ...categoryCondition },
        order: { createdAt: 'DESC' },
        take: limit,
        skip: (page - 1) * limit,
      }),
    };
  }

  async findAllWithPagination(title: string, page: number, limit: number) {
    return await this.courseRepository.find({
      where: {},
      order: { createdAt: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findByTitle(title: string) {
    return await this.courseRepository.find({
      where: { title: Like(`%${title}%`) },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(slug: string) {
    const course = await this.courseRepository.findOne({
      where: { slug },
      relations: {
        user: true,
        category: true,
        progress: true,
        chatGptHistory: true,
      },
    });

    if (!course) throw new NotFoundException('Course not found');

    return course;
  }

  async findOneById(id: number) {
    return await this.courseRepository.findOne({
      where: { id },
      relations: {
        chatGptHistory: true,
      },
    });
  }

  async findLesson(slug: string, lessonId: number) {
    const course = await this.courseRepository.findOne({
      where: { slug },
    });

    const findIndex = course.program.findIndex((elem) => elem.id === lessonId);
    const lesson = course.program[findIndex];
    const prevLessonId = course.program[findIndex - 1]
      ? course.program[findIndex - 1].id
      : null;
    const nextLessonId = course.program[findIndex + 1]
      ? course.program[findIndex + 1].id
      : null;

    return {
      lesson,
      prevLessonId,
      nextLessonId,
    };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');

    return await this.courseRepository.update(id, updateCourseDto);
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    return await this.courseRepository.delete(id);
  }
}
