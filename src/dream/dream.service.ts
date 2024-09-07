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

@Injectable()
export class DreamService {
  private readonly logger = new Logger(DreamService.name);

  constructor(
    private readonly dreamRepository: DreamRepository,
    private readonly usersRepository: UsersRepository,
    private readonly entityManager: EntityManager,
  ) {}

  getDreams(filterDto: FilterDto, user: User): Promise<Dream[]> {
    return this.dreamRepository.getDreams(filterDto, user);
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

  createDream(createDreamDto: CreateDreamDto, user: User): Promise<DreamDto> {
    return this.dreamRepository.createDream(createDreamDto, user);
  }
}
