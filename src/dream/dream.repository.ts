import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { UsersRepository } from '../auth/users.repository';
import { Dream } from './dream.entity';
import { DreamFilterDto } from './dto/dream-filter.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';

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

  async getDreams(
    filterDto: DreamFilterDto,
    userProp: User,
  ): Promise<PaginatedResponseDto<Dream>> {
    const { page, pageSize, search, mood, category } = filterDto;
    const { email } = userProp;
    const user = await this.usersRepository.findOne({ where: { email } });
    const query = this.createQueryBuilder('dream')
      .leftJoinAndSelect('dream.symbols', 'symbols')
      .leftJoinAndSelect('dream.category', 'category');

    query.andWhere({ user });
    if (search) {
      query.andWhere(
        '(LOWER(dream.title) LIKE LOWER(:search) OR LOWER(dream.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (mood) {
      query.andWhere('dream.mood = :mood', { mood });
    }

    if (category) {
      query.andWhere('dream.category = :category', { category });
    }
    const totalItems = await query.getCount();

    query.skip((page - 1) * pageSize).take(pageSize);

    const data = await query.getMany();

    return new PaginatedResponseDto(data, totalItems, page, pageSize);
  }
}
