import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../auth/users.repository';
import { DreamSymbolRepository } from './dream-symbol.repository';
import { SymbolDto } from './dto/symbol-dto';
import { DreamSymbol } from './symbol.entity';
import { FilterDto } from '../common/dto/FilterDto';
import { User } from '../auth/user.entity';

@Injectable()
export class SymbolService {
  private readonly logger = new Logger(SymbolService.name);

  constructor(
    private readonly symbolRepository: DreamSymbolRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getSymbols(filterDto: FilterDto, user: User): Promise<DreamSymbol[]> {
    return await this.symbolRepository.getSymbols(filterDto, user);
  }

  async getOrCreateSymbols(symbolNames: SymbolDto[]): Promise<DreamSymbol[]> {
    const symbolsEntities: DreamSymbol[] = [];

    for (const symbolName of symbolNames) {
      let symbol = await this.symbolRepository.findOne({
        where: { name: symbolName.name },
      });

      if (!symbol) {
        symbol = this.symbolRepository.create({ name: symbolName.name });
        await this.symbolRepository.save(symbol);
      }

      symbolsEntities.push(symbol);
    }

    return symbolsEntities;
  }
}
