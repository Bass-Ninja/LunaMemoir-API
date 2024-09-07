import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { UsersRepository } from '../auth/users.repository';
import { FilterDto } from '../common/dto/FilterDto';
import { DreamSymbol } from './symbol.entity';

@Injectable()
export class DreamSymbolRepository extends Repository<DreamSymbol> {
  constructor(
    @InjectRepository(DreamSymbol)
    private symbolRepository: Repository<DreamSymbol>,
    private usersRepository: UsersRepository,
  ) {
    super(
      symbolRepository.target,
      symbolRepository.manager,
      symbolRepository.queryRunner,
    );
  }

  async getSymbols(
    filterDto: FilterDto,
    userProp: User,
  ): Promise<DreamSymbol[]> {
    const { search } = filterDto;
    const { username } = userProp;
    const user = await this.usersRepository.findOne({ where: { username } });
    const query = this.createQueryBuilder('symbol');

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
