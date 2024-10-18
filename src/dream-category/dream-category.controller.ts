import { Controller, Get, Query, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/strategy/jwt-auth.guard';
import { DreamCategoryService } from './dream-category.service';
import { ApiArrayResponse } from '../common/api-decorator';
import { FilterDto } from '../common/dto/filter.dto';
import { DreamCategoryDto } from './dto/dream-category.dto';
import { HttpExceptionFilter } from '../common/http-exception.filter';

@Controller('dream-category')
@ApiTags('Dream Category')
@UseGuards(JwtGuard)
@UseFilters(new HttpExceptionFilter())
@ApiBearerAuth('Bearer')
export class DreamCategoryController {
  constructor(private readonly dreamCategoryService: DreamCategoryService) {}

  @ApiExtraModels(DreamCategoryDto)
  @ApiArrayResponse(DreamCategoryDto)
  @Get()
  async getDreamCategories(
    @Query() filterDto: FilterDto,
  ): Promise<DreamCategoryDto[]> {
    return await this.dreamCategoryService.getDreamCategories(filterDto);
  }
}
