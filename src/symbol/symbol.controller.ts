import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/strategy/jwt-auth.guard';
import { SymbolService } from './symbol.service';
import { FilterDto } from '../common/dto/filter.dto';
import { SymbolDto } from './dto/symbol.dto';
import { ApiArrayResponse } from '../common/api-decorator';

@Controller('symbol')
@ApiTags('Symbol')
@UseGuards(JwtGuard)
@ApiBearerAuth('Bearer')
export class SymbolController {
  constructor(private symbolService: SymbolService) {}

  @ApiExtraModels(SymbolDto)
  @ApiArrayResponse(SymbolDto)
  @Get()
  async getSymbols(@Query() filterDto: FilterDto): Promise<SymbolDto[]> {
    return await this.symbolService.getSymbols(filterDto);
  }
}
