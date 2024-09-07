import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/strategy/jwt-auth.guard';
import { SymbolService } from './symbol.service';
import { FilterDto } from '../common/dto/FilterDto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { DreamSymbol } from './symbol.entity';

@Controller('symbol')
@ApiTags('Symbol')
@UseGuards(JwtGuard)
@ApiBearerAuth('Bearer')
export class SymbolController {
  constructor(private symbolService: SymbolService) {}

  @Get()
  async getSymbols(
    @Query() filterDto: FilterDto,
    @GetUser() user: User,
  ): Promise<DreamSymbol[]> {
    return await this.symbolService.getSymbols(filterDto, user);
  }
}
