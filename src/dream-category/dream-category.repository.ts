import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../auth/users.repository';
import { FilterDto } from '../common/dto/filter.dto';
import { DreamCategory } from './dream-category.entity';

@Injectable()
export class DreamCategoryRepository extends Repository<DreamCategory> {
  constructor(
    @InjectRepository(DreamCategory)
    private dreamCategoryRepository: Repository<DreamCategory>,
    private usersRepository: UsersRepository,
  ) {
    super(
      dreamCategoryRepository.target,
      dreamCategoryRepository.manager,
      dreamCategoryRepository.queryRunner,
    );
  }

  async getDreamCategories(filterDto: FilterDto): Promise<DreamCategory[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('dream-category');

    if (search) {
      query.andWhere('(LOWER(dream-category.name) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }
    return await query.getMany();
  }
}
