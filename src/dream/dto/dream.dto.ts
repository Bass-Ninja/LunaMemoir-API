import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../auth/dto/user-dto';
import { ApiProperty } from '@nestjs/swagger';
import { SymbolDto } from '../../symbol/dto/symbol.dto';
import { DreamCategoryDto } from '../../dream-category/dto/dream-category.dto';
import { MoodDto } from '../../mood/dto/mood.dto';

export class DreamDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  @Type(() => MoodDto)
  mood: MoodDto;

  @Expose()
  @ApiProperty()
  @Type(() => DreamCategoryDto)
  category: DreamCategoryDto;

  @Expose()
  @ApiProperty()
  @Type(() => SymbolDto)
  symbols: SymbolDto[];

  @Expose()
  @ApiProperty()
  @Type(() => UserDto)
  user: UserDto;
}

export class DreamByCategoryCountDto {
  @Expose()
  @ApiProperty()
  categoryId: string;

  @Expose()
  @ApiProperty()
  categoryName: string;

  @Expose()
  @ApiProperty()
  dreamsCount: number;

  @Expose()
  @ApiProperty()
  totalCount: number;
}
