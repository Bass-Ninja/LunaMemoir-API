import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DreamService } from './dream.service';
import { Dream } from './dream.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { FilterDto } from '../common/dto/FilterDto';
import { JwtGuard } from '../auth/strategy/jwt-auth.guard';
import { CreateDreamDto } from './dto/create-dream-dto';
import { DreamDto } from './dto/dream-dto';

@Controller('dream')
@ApiTags('Dream')
@UseGuards(JwtGuard)
@ApiBearerAuth('Bearer')
export class DreamController {
  constructor(private dreamService: DreamService) {}

  @Get()
  async getDreams(
    @Query() filterDto: FilterDto,
    @GetUser() user: User,
  ): Promise<Dream[]> {
    return await this.dreamService.getDreams(filterDto, user);
  }

  @Get('/:id')
  async getDreamById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<DreamDto> {
    return await this.dreamService.getDreamById(id, user);
  }

  @Post()
  async createDream(
    @Body() createDreamDto: CreateDreamDto,
    @GetUser() user: User,
  ): Promise<DreamDto> {
    return await this.dreamService.createDream(createDreamDto, user);
  }
}
