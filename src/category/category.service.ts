import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(CreateCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.findBy({
      title: CreateCategoryDto.title,
    });

    if (category.length)
      throw new BadRequestException('This category already exist');

    const newCategory = { title: CreateCategoryDto.title };
    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.categoryRepository.find({
      where: {},
      relations: {
        courses: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
