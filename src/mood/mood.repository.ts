import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../auth/users.repository';
import { FilterDto } from '../common/dto/filter.dto';
import { Mood } from './mood.entity';

@Injectable()
export class MoodRepository extends Repository<Mood> {
  constructor(
    @InjectRepository(Mood)
    private moodRepository: Repository<Mood>,
    private usersRepository: UsersRepository,
  ) {
    super(
      moodRepository.target,
      moodRepository.manager,
      moodRepository.queryRunner,
    );
  }

  async getMoods(filterDto: FilterDto): Promise<Mood[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('mood');

    if (search) {
      query.andWhere('(LOWER(mood.name) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }
    return await query.getMany();
  }
}
