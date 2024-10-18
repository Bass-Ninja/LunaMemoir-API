import { Controller, Get, Query, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/strategy/jwt-auth.guard';
import { FilterDto } from '../common/dto/filter.dto';
import { ApiArrayResponse } from '../common/api-decorator';
import { MoodService } from './mood.service';
import { MoodDto } from './dto/mood.dto';
import { HttpExceptionFilter } from '../common/http-exception.filter';

@Controller('mood')
@ApiTags('Mood')
@UseGuards(JwtGuard)
@UseFilters(new HttpExceptionFilter())
@ApiBearerAuth('Bearer')
export class MoodController {
  constructor(private moodService: MoodService) {}

  @ApiExtraModels(MoodDto)
  @ApiArrayResponse(MoodDto)
  @Get()
  async getMoods(@Query() filterDto: FilterDto): Promise<MoodDto[]> {
    return await this.moodService.getMoods(filterDto);
  }
}
