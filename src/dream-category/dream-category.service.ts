import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../auth/users.repository';
import { FilterDto } from '../common/dto/filter.dto';
import { plainToInstance } from 'class-transformer';
import { DreamCategoryDto } from './dto/dream-category.dto';
import { DreamCategoryRepository } from './dream-category.repository';
import { DreamCategory } from './dream-category.entity';

@Injectable()
export class DreamCategoryService {
  private readonly logger = new Logger(DreamCategoryService.name);

  constructor(
    private readonly dreamCategoryRepository: DreamCategoryRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getDreamCategories(filterDto: FilterDto): Promise<DreamCategoryDto[]> {
    this.logger.log('Listing dream categories');
    return plainToInstance(
      DreamCategoryDto,
      await this.dreamCategoryRepository.getDreamCategories(filterDto),
    );
  }

  async getOrCreateDreamCategory(
    categoryDto: DreamCategoryDto,
  ): Promise<DreamCategory> {
    let category: DreamCategory;
    try {
      if (categoryDto && categoryDto.id) {
        category = await this.dreamCategoryRepository.findOne({
          where: { id: categoryDto.id },
        });
      } else {
        category = this.dreamCategoryRepository.create({
          name: categoryDto.name.toUpperCase(),
        });
        await this.dreamCategoryRepository.save(category);
      }
    } catch (error) {
      throw new Error(error.message);
    }
    return category;
  }
}
