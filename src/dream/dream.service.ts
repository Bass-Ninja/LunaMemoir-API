import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../auth/users.repository';
import { DreamRepository } from './dream.repository';
import { Dream } from './dream.entity';
import { User } from '../auth/user.entity';
import { CreateDreamDto } from './dto/create-dream.dto';
import { DreamDto, DreamByCategoryCountDto } from './dto/dream.dto';
import { plainToInstance } from 'class-transformer';
import { EntityManager } from 'typeorm';
import { SymbolService } from '../symbol/symbol.service';
import { DreamFilterDto } from './dto/dream-filter.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { DreamCategoryService } from '../dream-category/dream-category.service';
import { MoodService } from '../mood/mood.service';

@Injectable()
export class DreamService {
  private readonly logger = new Logger(DreamService.name);

  constructor(
    private readonly dreamRepository: DreamRepository,
    private readonly usersRepository: UsersRepository,
    private readonly entityManager: EntityManager,
    private readonly symbolService: SymbolService,
    private readonly dreamCategoryService: DreamCategoryService,
    private readonly moodService: MoodService,
  ) {}

  async getDreams(
    filterDto: DreamFilterDto,
    user: User,
  ): Promise<PaginatedResponseDto<DreamDto>> {
    this.logger.log(`Listing dreams for user: ${user.email}`);
    return plainToInstance(
      PaginatedResponseDto<DreamDto>,
      await this.dreamRepository.getDreams(filterDto, user),
    );
  }

  async getDreamById(id: string, userProp: User): Promise<DreamDto> {
    this.logger.log(`Fetching dream with ID: ${id}`);

    const { email } = userProp;
    const user = await this.usersRepository.findOne({ where: { email } });
    const found = await this.entityManager.findOne(Dream, {
      where: { id: id, user: { id: user.id } },
      relations: ['category', 'symbols', 'mood'],
    });
    if (!found) {
      this.logger.error(`Dream with "${id} not found."`);
      throw new NotFoundException(`Dream with "${id} not found."`);
    }
    return plainToInstance(DreamDto, found);
  }

  async createDream(
    createDreamDto: CreateDreamDto,
    user: User,
  ): Promise<DreamDto> {
    this.logger.log(`User ${user.email} creating dream`);
    const { title, description, mood, category, symbols } = createDreamDto;
    const { email } = user;
    const userEntity = await this.usersRepository.findOne({
      where: { email },
    });
    const symbolsEntities =
      await this.symbolService.getOrCreateSymbols(symbols);
    const categoryEntity =
      await this.dreamCategoryService.getOrCreateDreamCategory(category);
    const moodEntity = await this.moodService.getOrCreateMood(mood);
    const dream: Dream = this.dreamRepository.create({
      title,
      description,
      mood: moodEntity,
      category: categoryEntity,
      symbols: symbolsEntities,
    });
    dream.user = userEntity;

    try {
      await this.dreamRepository.save(dream);
    } catch (error) {
      console.error('Error creating dream:', error);
      throw error;
    }
    return plainToInstance(DreamDto, dream);
  }

  async updateDream(
    id: string,
    updateDreamDto: CreateDreamDto,
  ): Promise<DreamDto> {
    const dream = await this.dreamRepository.findOne({
      where: { id },
      relations: ['category', 'symbols', 'mood'],
    });

    if (!dream) {
      throw new Error('Dream not found');
    }

    dream.title = updateDreamDto.title;
    dream.description = updateDreamDto.description;

    if (updateDreamDto.category) {
      dream.category = await this.dreamCategoryService.getOrCreateDreamCategory(
        updateDreamDto.category,
      );
    }

    if (updateDreamDto.mood) {
      dream.mood = await this.moodService.getOrCreateMood(updateDreamDto.mood);
    }

    if (updateDreamDto.symbols) {
      dream.symbols = await this.symbolService.getOrCreateSymbols(
        updateDreamDto.symbols,
      );
    }

    await this.dreamRepository.save(dream);
    return plainToInstance(DreamDto, dream);
  }

  async getDreamsGroupedByCategory(
    userProp: User,
  ): Promise<DreamByCategoryCountDto[]> {
    const { email } = userProp;
    const user = await this.usersRepository.findOne({ where: { email } });

    const dreams = await this.dreamRepository.find({
      where: { user },
      relations: ['category'],
    });

    const dreamsGroupedByCategory: { [key: string]: number } = {};

    dreams.forEach((dream) => {
      const categoryId = dream.category.id;

      if (!dreamsGroupedByCategory[categoryId]) {
        dreamsGroupedByCategory[categoryId] = 0;
      }

      dreamsGroupedByCategory[categoryId]++;
    });

    return Object.keys(dreamsGroupedByCategory).map((categoryId) => ({
      categoryId,
      categoryName: dreams.find((dream) => dream.category.id === categoryId)
        ?.category.name,
      dreamsCount: dreamsGroupedByCategory[categoryId],
      totalCount: dreams.length,
    })) as DreamByCategoryCountDto[]; // Cast to the DTO type
  }
}
