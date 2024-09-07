import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../auth/users.repository';
import { DreamRepository } from './dream.repository';
import { Dream } from './dream.entity';
import { FilterDto } from '../common/dto/FilterDto';
import { User } from '../auth/user.entity';
import { CreateDreamDto } from './dto/create-dream-dto';
import { DreamDto } from './dto/dream-dto';
import { plainToInstance } from 'class-transformer';
import { EntityManager } from 'typeorm';
import { SymbolService } from '../symbol/symbol.service';

@Injectable()
export class DreamService {
  private readonly logger = new Logger(DreamService.name);

  constructor(
    private readonly dreamRepository: DreamRepository,
    private readonly usersRepository: UsersRepository,
    private readonly entityManager: EntityManager,
    private readonly symbolService: SymbolService,
  ) {}

  async getDreams(filterDto: FilterDto, user: User): Promise<Dream[]> {
    return await this.dreamRepository.getDreams(filterDto, user);
  }

  async getDreamById(id: string, userProp: User): Promise<DreamDto> {
    const { username } = userProp;
    const user = await this.usersRepository.findOne({ where: { username } });
    const found = await this.entityManager.findOne(Dream, {
      where: { id: id, user: { id: user.id } },
      relations: ['user'],
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
    const { title, description, mood, symbols } = createDreamDto;
    const { username } = user;
    const userEntity = await this.usersRepository.findOne({
      where: { username },
    });
    const symbolsEntities =
      await this.symbolService.getOrCreateSymbols(symbols);

    const dream: Dream = this.dreamRepository.create({
      title,
      description,
      mood,
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
}
