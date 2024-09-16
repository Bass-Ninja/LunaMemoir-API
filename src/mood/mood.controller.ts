import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/strategy/jwt-auth.guard';
import { FilterDto } from '../common/dto/filter.dto';
import { ApiArrayResponse } from '../common/api-decorator';
import { MoodService } from './mood.service';
import { MoodDto } from './dto/mood.dto';

@Controller('mood')
@ApiTags('Mood')
@UseGuards(JwtGuard)
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
