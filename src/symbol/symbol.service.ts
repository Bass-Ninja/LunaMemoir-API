import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../auth/users.repository';
import { DreamSymbolRepository } from './dream-symbol.repository';
import { SymbolDto } from './dto/symbol.dto';
import { DreamSymbol } from './symbol.entity';
import { FilterDto } from '../common/dto/filter.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SymbolService {
  private readonly logger = new Logger(SymbolService.name);

  constructor(
    private readonly symbolRepository: DreamSymbolRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getSymbols(filterDto: FilterDto): Promise<SymbolDto[]> {
    this.logger.log('Listing symbols');
    return plainToInstance(
      SymbolDto,
      await this.symbolRepository.getSymbols(filterDto),
    );
  }

  async getOrCreateSymbols(symbols: SymbolDto[]): Promise<DreamSymbol[]> {
    const symbolsEntities: DreamSymbol[] = [];
    for (const dreamSymbol of symbols) {
      let symbol: DreamSymbol;
      if (dreamSymbol.id) {
        symbol = await this.symbolRepository.findOne({
          where: { id: dreamSymbol.id },
        });
      } else {
        symbol = this.symbolRepository.create({
          name: dreamSymbol.name.toUpperCase(),
        });
        await this.symbolRepository.save(symbol);
      }
      symbolsEntities.push(symbol);
    }
    return symbolsEntities;
  }
}
