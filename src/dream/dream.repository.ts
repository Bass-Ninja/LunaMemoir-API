import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { UsersRepository } from '../auth/users.repository';
import { Dream } from './dream.entity';
import { FilterDto } from '../common/dto/FilterDto';

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
