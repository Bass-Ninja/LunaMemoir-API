import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { DreamService } from './dream.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { JwtGuard } from '../auth/strategy/jwt-auth.guard';
import { CreateDreamDto } from './dto/create-dream.dto';
import { DreamDto } from './dto/dream.dto';
import { ApiArrayResponse, ApiDtoResponse } from '../common/api-decorator';
import { DreamFilterDto } from './dto/dream-filter.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { Response } from 'express';
import { SymbolDto } from '../symbol/dto/symbol.dto';
import { UserDto } from '../auth/dto/user-dto';
import { DreamCategoryDto } from '../dream-category/dto/dream-category.dto';

@Controller('dream')
@ApiTags('Dream')
@UseGuards(JwtGuard)
@ApiBearerAuth('Bearer')
export class DreamController {
  constructor(private dreamService: DreamService) {}

  @ApiExtraModels(
    DreamDto,
    UserDto,
    SymbolDto,
    DreamCategoryDto,
    PaginatedResponseDto,
  )
  @ApiArrayResponse(DreamDto)
  @Get()
  async getDreams(
    @Query() filterDto: DreamFilterDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<DreamDto[]> {
    const {
      data,
      totalItems,
      totalPages,
      pageSize,
      currentPage,
      hasPreviousPage,
      hasNextPage,
    } = await this.dreamService.getDreams(filterDto, user);

    res.setHeader('X-Total-Count', totalItems.toString());
    res.setHeader('X-Page', currentPage.toString());
    res.setHeader('X-Page-Size', pageSize.toString());
    res.setHeader('X-Total-Pages', totalPages.toString());
    res.setHeader('X-Has-Next-Page', hasNextPage.toString());
    res.setHeader('X-Has-Previous-Page', hasPreviousPage.toString());

    return data;
  }

  @ApiExtraModels(DreamDto)
  @ApiDtoResponse(DreamDto)
  @Get('/:id')
  async getDreamById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<DreamDto> {
    return await this.dreamService.getDreamById(id, user);
  }

  @ApiExtraModels(CreateDreamDto, SymbolDto, DreamCategoryDto)
  @ApiDtoResponse(CreateDreamDto)
  @Post()
  async createDream(
    @Body() createDreamDto: CreateDreamDto,
    @GetUser() user: User,
  ): Promise<DreamDto> {
    return await this.dreamService.createDream(createDreamDto, user);
  }

  @ApiExtraModels(CreateDreamDto, SymbolDto, DreamCategoryDto)
  @ApiDtoResponse(CreateDreamDto)
  @Put('/:id')
  async updateDream(
    @Param('id') id: string,
    @Body() updateDreamDto: CreateDreamDto,
  ): Promise<DreamDto> {
    return await this.dreamService.updateDream(id, updateDreamDto);
  }
}
