import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateDreamDto } from './dto/create-dream-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { UsersRepository } from '../auth/users.repository';
import { Dream } from './dream.entity';
import { FilterDto } from '../common/dto/FilterDto';
import { plainToInstance } from 'class-transformer';
import { DreamDto } from './dto/dream-dto';

@Injectable()
export class DreamRepository extends Repository<Dream> {
  constructor(
    @InjectRepository(Dream)
    private dreamRepository: Repository<Dream>,
    private usersRepository: UsersRepository,
  ) {
    super(
      dreamRepository.target,
      dreamRepository.manager,
      dreamRepository.queryRunner,
    );
  }

  async createDream(
    createDreamDto: CreateDreamDto,
    user: User,
  ): Promise<DreamDto> {
    const { title, description, mood } = createDreamDto;
    const { username } = user;
    const userEntity = await this.usersRepository.findOne({
      where: { username },
    });

    const dream: Dream = this.create({
      title,
      description,
      mood,
      tags: [],
    });
    dream.user = userEntity;

    try {
      await this.save(dream);
    } catch (error) {
      console.error('Error creating dream:', error);
      throw error;
    }

    return plainToInstance(DreamDto, dream);
  }

  async getDreams(filterDto: FilterDto, userProp: User): Promise<Dream[]> {
    const { search } = filterDto;
    const { username } = userProp;
    const user = await this.usersRepository.findOne({ where: { username } });
    const query = this.createQueryBuilder('dream');

    query.andWhere({ user });
    if (search) {
      query.andWhere(
        '(LOWER(dream.title) LIKE LOWER(:search) OR LOWER(dream.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }
}
